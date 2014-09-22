# Locale.js
Locale.js is a client side Javascript Localization library.

## Demo
[http://opensource.tonytuan.org/locale.js/](http://opensource.tonytuan.org/locale.js/)

## Example
1. Include Locale.js in your html
```JavaScript
<html>
 <head>
  <script src="js/locale.js"></script>
 </head>
</html>
```
2. Set the supported lanauage
```
Locale.setLanguageUrls(['langs/lang_en_US.txt',
                        'langs/lang_zh_TW.txt', 
                        'langs/lang_zh_CN.txt']);
```
3. Define the key-value pairs in language files. For example, the "lang_en_US.txt" may looks like:
```
js_popular=JavaScript is one of the most popular languages on the web.
...
```

4. Then use the API
```
// Explicitly choose a language. 
// It's an optional step. Locale.js can auto-detect browser language.
Locale.setCurrentLanguage('en_US'); 

// Loads "lang_en_US.txt"
Locale.loadAsync(function(){
   console.log(Locale.getMsg('feature1')); // prints string "JavaScript is ... the web."
});
``` 

## Feature
* It's a standalone library which is compatible with any JS project.
* Small (2kb) and Fast.
* Auto-detect default browser language.
* Arbitrary number of arguments to replace the tokenized string. For example, "Your display resolution is {0} x {1}." can be replaced with "Your display resolution is 1024 x 768."

