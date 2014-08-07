/*
Copyright [2013] [Tony Tuan]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
/*
 * Locale.getMsg('key', param1, param2, ....);
 * Ex: Locale.getMsg("Hi, My name is {0}. My email is {1}", "Tony", "tony@example.com");
 * It will show "Hi, My name is Tony. My email is tony@example.com".
 */

var Locale = (function() {
	"use strict";


	// interface
	var Module = {
		setLanguageUrls: setLanguageUrls,
		getMsg: getMsg,
		useLanguage: useLanguage,
		// save language in cookie
		saveLanguage: saveLanguage,
		hasKey: hasKey,
		load: load

	};





	function setLanguageUrls(langUrls) {
		this.langUrls = langUrls;
	}

	function getMsg(key) {
		if (this.map[key]) {
			var args = [],
				i;
			if (arguments.length == 1) {
				return this.map[key];
			}
			else { // >1
				for (i = 1; i < arguments.length; i++) {
					args.push(arguments[i]);
				}
				return this.map[key].replace(/\{(\d+)\}/g, function(m, i) {
					return args[i];
				});
			}
		}
		return key + '.UNDEFINED';
		// return this.map[key] ? this.map[key] : key + '.undefined';
	}

	function useLanguage(lang) {
		this.lang = lang;
	}

	function saveLanguage(lang) {
		_setCookie('lang', lang);
	}



	function hasKey(key) {
		return this.map[key] !== null;
	}


	function load() {
		var me = this;
		this.map = {};
		var xmlhttp;
		if (window.XMLHttpRequest) {
			// for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		}
		else {
			// for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var lines = xmlhttp.responseText.split(/\r\n|\r|\n/g);
				for (var i = 0; i < lines.length; ++i) {
					var first = lines[i].indexOf('=');
					var key = lines[i].substr(0, first);
					var value = lines[i].substr(first + 1);
					if (key && value) {
						value = value.replace(/\r/g, '');
						value = value.replace(/\n/g, '');
						me.map[key] = value;
					}
				}
			}
		};
		// Preventing Open Redirection Attacks
		var lang = _getLanguage.call(this); 
		for (var i = 0, len = this.langUrls.length; i < len; i++) {
			if (this.langUrls[i].indexOf(lang) !== -1) {
				xmlhttp.open("GET", this.langUrls[i] + '?' + _getRandParam(), false);
				xmlhttp.send();
				return;
			}
		}
		// if preferred language is not listed in langUrls, just use the first one
		xmlhttp.open("GET", me.langUrls[0] + '?' + _getRandParam(), false);
		xmlhttp.send();
	}

	function _setCookie(name, value) {
		document.cookie = name + "=" + escape(value);
	}

	function _getCookie(name) {
		var arg = name + "=",
			alen = arg.length,
			clen = document.cookie.length,
			i = 0,
			j = 0;
		while (i < clen) {
			j = i + alen;
			if (document.cookie.substring(i, j) == arg) {
				return _getCookieVal.call(this, j);
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if (i === 0) {
				break;
			}
		}
		return null;
	}

	function _getCookieVal(offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if (endstr == -1) {
			endstr = document.cookie.length;
		}
		return unescape(document.cookie.substring(offset, endstr));
	}


	function _getLanguage() {

		// 0. setLanguage() 1.url 2. cookies 3. _guessLanguage 4. default (the first lang)
		var language = this.lang || _getQueryParam(location.search, 'lang') || _getCookie('lang') || _guessLanguage();
		return _formatLang(language);
	}


	function _guessLanguage() {
		return (navigator.language || navigator.browserLanguage || navigator.userLanguage);
	}

	function _getRandParam() {
		return '_rand=' + (new Date()).getTime();
	}

	function _formatLang(lang) {
		lang = lang.split('_');
		if (lang.length == 1) {
			lang = lang[0].split('-');
		}
		return lang[0].toLowerCase() + '_' + lang[1].toUpperCase();
	}


	// _getQueryParam('/?lang=zh-TW&debug=true', 'lang') will return 'zh-TW'

	function _getQueryParam(queryString, target) {
		queryString = location.search.split('?')[1];
		if (queryString) {
			var params = queryString.split('&');
			if (params) {
				for (var i = 0; i < params.length; ++i) {
					var param = params[i].split('=');
					if (param[0] === target) return param[1];
				}
			}
		}
		return null;
	}

	return Module;

})();
