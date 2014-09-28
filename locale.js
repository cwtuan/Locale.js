var Locale = (function() {
	"use strict";

	// public methods
	return {
		/**
		 * Set the supported language properites.
		 * @param {{String[]} langUrls The array of URLs of language properites.
		 *                    For example, ['lang/lang_en_US', 'lang/lang_zh_TW']
		 *                    Locale name refer to Table 1 in http://goo.gl/8BKiqm
		 */
		setLanguageUrls: function(langUrls) {
			this.langUrls = langUrls;
		},

		/**
		 * Get the corresponding message.
		 *
		 * [Basic Usage]
		 * Example: a key-value pair defined in the language property like:
		 *  hello=Hello, how are you?
		 * Locale.getMsg('hello'); // return the string "Hello, how are you?."
		 *
		 * [Advance Usage]
		 * You can pass an arbitrary number of arguments to replace the variables.
		 * Example, a key-value pair defined in the language property like:
		 *  resolution="Your display resolution is {0} x {1}."
		 * Locale.getMsg('resolution', screen.width, screen.height); // return "Your display resolution is 1024 x 768."
		 *
		 * @param {String} key The key defined in the language property.
		 * @param {Mixed...} values The values to replace arbitrary number of variables `{0}`, `{1}`, ....
		 * @return {String} The corresponding message.
		 */
		getMsg: function(key) {
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
		},

		/**
		 * Load the language property.
		 * Locale.js will determine the perfered lanauge by the following order:
		 * 1. Specify a language for this session. Example: Locale.setCurrentLanguage('en_US');
		 * 2. URL parameter. Example: http://localhost?lang=en_US
		 * 3. Cookies: Example: Locale.saveLanguage('en_US');
		 * 4. The browser's dafualt langauge
		 * 5. If all of the conditions above doesn't meet, Locale.js will use the first lang defiend in Locale.setLanguageUrls([...])
		 *
		 * @param {function} callback The callback function which is executed when language property loaded.
		 */
		loadAsync: function(callback) {
			_load.call(this, true, callback);
		},


		/**
		 * Load language property in sync mode.
		 */
		loadSync: function() {
			_load.call(this, false);
		},

		/**
		 * Explicitly choose a language for this session.
		 * @param {String} lang The locale name defined in http://goo.gl/8BKiqm
		 */
		setCurrentLanguage: function(lang) {
			this.currentLang = lang;
		},


		/**
		 * Save the perfered language in cookies so that Locale.js will use this language next time.
		 * @param {String} lang The locale name defined in http://goo.gl/8BKiqm
		 */
		saveLanguage: function(lang) {
			_setCookie('lang', lang);
		},

		/**
		 * Check if a key is defined in language property.
		 * @param {String} key The key defined in language property
		 * @return {Boolean} True if the language property contains this key, false otherwise
		 */
		hasKey: function(key) {
			return this.map[key] !== null;
		},

		/**
		 * Get the currnet locale name.
		 * If you'd like save the user prefred lanauge in DB, using this function to get the locale name.
		 * So the next time when user login the website, you can retrive the user prefered lanauge from DB, 
		 * and call locale.setCurrentLanguage(...) to restore the lanauge the user selected last time.
		 * @return {string} currnet locale name
		 */
		getCurrentLanguage: function() {
			// 1. setCurrentLanguage() 2.url param 3. cookies 4. _getBrowserLang 5. default (the first lang)
			var language = this.currentLang || _getQueryParam(location.search, 'lang') || _getCookie('lang') || _getBrowserLang();
			return _formatLang(language);
		}

	};




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
		lang = me.getCurrentLanguage.call(this);
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



	function _getBrowserLang() {
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



})();
