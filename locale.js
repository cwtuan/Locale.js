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

var Locale = {
	langUrls : [ 'langs/lang_en_US.properties', 'langs/lang_zh_TW.properties' ],	
	hasKey : function(key) {
		return this.map[key] != null;
	},
	getMsg : function(key) {	
		if (this.map[key]) {
			var args = [], i;
			if (arguments.length == 1) {
				return this.map[key];
			} else { // >1
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
	},

	setLanguage : function(lang) {
		this._setCookie('lang', lang);

	},
	_setCookie : function(name, value) {
		document.cookie = name + "=" + escape(value);
	},
	_getCookie : function(name) {
		var arg = name + "=", alen = arg.length, clen = document.cookie.length, i = 0, j = 0;

		while (i < clen) {
			j = i + alen;
			if (document.cookie.substring(i, j) == arg) {
				return this._getCookieVal(j);
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if (i === 0) {
				break;
			}
		}
		return null;
	},
	_getCookieVal : function(offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if (endstr == -1) {
			endstr = document.cookie.length;
		}
		return unescape(document.cookie.substring(offset, endstr));
	},
	getLanguage : function() {
		// 1..url 2. cookies 3. _guessLanguage 4. default (the first lang)
		var language = this._getQueryParam(location.search, 'lang') || this._getCookie('lang') || this._guessLanguage();
		return this._formatLang(language);
	},
	_guessLanguage : function() {
		return (navigator.language || navigator.browserLanguage || navigator.userLanguage);
	},
	load : function() {
		var me = this;
		this.map = {};
		var xmlhttp;
		if (window.XMLHttpRequest) {
			// for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {
			// for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var lines = xmlhttp.responseText.split(/\r\n|\r|\n/g);
				for ( var i = 0; i < lines.length; ++i) {
					// console.log(' lines[i]', lines[i]);
					var first = lines[i].indexOf('=');
					var key = lines[i].substr(0, first);
					var value = lines[i].substr(first + 1);
					if (key && value) {
						value = value.replace(/\r/g, '');
						value = value.replace(/\n/g, '');
						me.map[key] = value;
					}
				}
				// console.info('locale loaded');
				// console.log('this.map',this.map);
			}
		};
		// Preventing Open Redirection Attacks
		var lang = me.getLanguage();
		for ( var i = 0, len = me.langUrls.length; i < len; i++) {
			if (me.langUrls[i].indexOf(lang) !== -1) {
				xmlhttp.open("GET", me.langUrls[i] + '?' + this._getRandParam(), false);
				xmlhttp.send();
				return;
			}
		}
		// if preferred language is not listed in langUrls, just use the first one
		xmlhttp.open("GET", me.langUrls[0] + '?' + this._getRandParam(), false);
		xmlhttp.send();

	},
	// _buildURL : function() {
	// // Ex: "app/locale/Application-en_US.txt?_dc=1378102793941"
	// return this.path + this.prefix + '-' + this.getLanguage() + this.extension + '?' + this._getRandParam();
	// },
	_getRandParam : function() {
		return '_rand=' + (new Date()).getTime();
	},
	_formatLang : function(lang) {
		var lang = lang.split('_');
		if (lang.length == 1) {
			lang = lang[0].split('-');
		}

		return lang[0].toLowerCase() + '_' + lang[1].toUpperCase();
	},
	/**
	 * _getQueryParam('/?lang=zh-TW&debug=true', 'lang') will return 'zh-TW'
	 */
	_getQueryParam : function(queryString, target) {
		queryString = location.search.split('?')[1];
		if (queryString) {
			var params = queryString.split('&');
			if (params) {
				for ( var i = 0; i < params.length; ++i) {
					var param = params[i].split('=');
					if (param[0] === target)
						return param[1];
				}
			}
		}
		return null;
	}
};

Locale.load();
