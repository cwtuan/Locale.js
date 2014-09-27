# Locale.js
* Locale.js is a client side Javascript Localization (i18n) library.
* It's a standalone library which is compatible with any JS projects and browsers.
* Small (2kb) and Fast.
* Auto-detect default browser language.

## Demo
<a title="Locale.js Demo" alt="Locale.js Demo" href="http://opensource.tonytuan.org/locale.js" target="_blank">
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


