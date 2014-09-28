# Locale.js
Locale.js is a client side Javascript Localization (i18n) library.

## Demo
<a title="Click to open Locale.js demo website" alt="Locale.js Demo" href="http://opensource.tonytuan.org/locale.js" target="_blank">
<img src="https://raw.githubusercontent.com/cwtuan/Locale.js/master/example/images/snapshot.jpg">
</a>

## Basic Usage
### Define the key-value pairs in language properties.
Create the supported language properties in "lang" directory.

For example, "lang/lang_en_US.txt":
```
feature1=It's a standalone library which is compatible with any JS project.
feature2=Small (2KB) and Fast.
```
and "lang/lang_zh_TW.txt":
```
feature1=不依賴其他JS套件，可相容於任何Javascript專案
feature2=程式小巧快速，本身僅有2K左右
```

### JS Code snippet 
```html
<html>
<head>
    <script src="http://raw.githubusercontent.com/cwtuan/Locale.js/master/example/js/locale-1.0.min.js"></script>

    <script>
        // Set the supported language properties
        Locale.setLanguageUrls([
            'langs/lang_en_US.txt',
            'langs/lang_zh_TW.txt'
        ]);

         // Load the language property on demand (Auto-detect browser language.)
        Locale.loadAsync(function() {
            // prints string "It's a standalone ... with any JS project."
            console.log(Locale.getMsg('feature1'));
        });
    </script>

</head>
</html>
``` 

## API doc
```javascript
/**
 * Set the supported language properites.
 * @param {{String[]} langUrls The array of URLs of language properites.
 *                    For example, ['lang/lang_en_US', 'lang/lang_zh_TW']
 *                    Locale name refer to Table 1 in http://goo.gl/8BKiqm
 */
function setLanguageUrls(langUrls)


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
function getMsg(key)


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
function loadAsync(callback)


/**
 * Load language property in sync mode.
 */
function loadSync()


/**
 * Explicitly choose a language for this session.
 * @param {String} lang The locale name defined in http://goo.gl/8BKiqm
 */
function setCurrentLanguage(lang)

/**
 * Save the perfered language in cookies so that Locale.js will use this language next time.
 * @param {String} lang The locale name defined in http://goo.gl/8BKiqm
 */
function saveLanguage(lang)


/**
 * Check if a key is defined in language property.
 * @param {String} key The key defined in language property
 * @return {Boolean} True if the language property contains this key, false otherwise
 */
function hasKey(key) 


/**
 * Get the currnet locale name.
 * If you'd like save the user prefred lanauge in DB, using this function to get the locale name.
 * So the next time when user login the website, you can retrive the user prefered lanauge from DB,
 * and call locale.setCurrentLanguage(...) to restore the lanauge the user selected last time.
 * @return {string} currnet locale name
 */
function getCurrentLanguage()
```

## License	
Apache License version 2.0
