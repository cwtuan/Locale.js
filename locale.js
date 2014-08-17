/*
@author Tony Tuan <dmitrychleck@gmail.com>
@url https://github.com/chleck/locale-js

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


var Locale = (function() {
	"use strict";

	var Module = {
		setLanguageUrls: setLanguageUrls,
		getMsg: getMsg,
		useLanguage: useLanguage,
		// save language in cookie
		saveLanguage: saveLanguage,
		hasKey: hasKey,
		loadSync: loadSync,
		loadAsync: loadAsync
	};

	function setLanguageUrls(langUrls) {
		this.langUrls = langUrls;
	}

	function getMsg(key) {
		var args, i;

		if (this.map[key]) {
			args = [];
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

	function loadSync() {
		_load.call(this, false);
	}

	function loadAsync(callback) {
		_load.call(this, true, callback);
	}

	function _load(async, callback) {
		var me = this,
			xmlhttp,
			lines,
			i,
			first,
			key,
			value,
			lang,
			selectedLangUrl,
			len;
		this.map = {};

		if (!this.langUrls) {
			console.error('You should call setLanguageUrls() before loading lagnuage file.');
		}

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
				lines = xmlhttp.responseText.split(/\r\n|\r|\n/g);
				for (i = 0; i < lines.length; ++i) {
					first = lines[i].indexOf('=');
					key = lines[i].substr(0, first);
					value = lines[i].substr(first + 1);
					if (key && value) {
						value = value.replace(/\r/g, '').replace(/\n/g, '');
						me.map[key] = value;
					}
				}

				if (async) {
					callback();
				}
			}

		};
		// Preventing Open Redirection Attacks
		lang = _getLanguage.call(this);
		for (i = 0, len = this.langUrls.length; i < len; i++) {
			if (this.langUrls[i].indexOf(lang) !== -1) {
				selectedLangUrl = this.langUrls[i];
				break;
			}
		}
		// if preferred language is not listed in langUrls, just use the first one		
		selectedLangUrl = selectedLangUrl || me.langUrls[0];
		xmlhttp.open("GET", selectedLangUrl + '?' + _getRandParam(), async);
		xmlhttp.send();
	}

	function _setCookie(name, value) {
		document.cookie = name + "=" + encodeURIComponent(value);
	}

	function _getCookie(name) {
		var arg = name + "=",
			i = 0,
			j = 0,
			nameIndex;
		while (i < document.cookie.length) {
			j = i + arg.length;
			if (document.cookie.substring(i, j) === arg) {
				return _getCookieVal.call(this, j);
			}
			nameIndex = document.cookie.indexOf(" ", i);
			if (nameIndex === -1) {
				return null;
			}
			i = 1 + nameIndex;
		}
		return null;
	}

	function _getCookieVal(offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if (endstr == -1) {
			endstr = document.cookie.length;
		}
		return encodeURIComponent(document.cookie.substring(offset, endstr));
	}

	function _getLanguage() {
		// 0. setLanguage() 1.url param 2. cookies 3. _guessLanguage 4. default (the first lang)
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

	function _getQueryParam(queryString, target) {
		var params, i, param;
		queryString = location.search.split('?')[1];
		if (queryString) {
			params = queryString.split('&');
			if (params) {
				for (i = 0; i < params.length; ++i) {
					param = params[i].split('=');
					if (param[0] === target) return param[1];
				}
			}
		}
		return null;
	}

	return Module;

})();
