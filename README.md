# Locale.js
Locale.js is a client side Javascript Localization (i18n) library.

## Demo
<a title="Locale.js Demo" alt="Locale.js Demo" href="http://opensource.tonytuan.org/locale.js" target="_blank">
<img src="https://raw.githubusercontent.com/cwtuan/Locale.js/master/example/images/snapshot.jpg">
</a>

## Usage
##### Define the key-value pairs in language files.
For example, the "lang_en_US.txt" may looks like:
```
feature1=It's a standalone library which is compatible with any JS project.
feature2=Small (2KB) and Fast.
```

##### Then use the API
```html
<html>
<head>
    <script src="http://raw.githubusercontent.com/cwtuan/Locale.js/master/example/js/locale-1.0.min.js"></script>

    <script>
        // Set the supported languages
        Locale.setLanguageUrls([
            'langs/lang_en_US.txt',
            'langs/lang_zh_TW.txt',
            'langs/lang_zh_CN.txt'
        ]);

         // Load language property like "lang_en_US.txt"
        Locale.loadAsync(function() {
            // prints string "It's a standalone ... with any JS project."
            console.log(Locale.getMsg('feature1'));
        });
    </script>

</head>
</html>
``` 

## Feature
* It's a standalone library which is compatible with any JS project.
* Small (2kb) and Fast.
* Auto-detect default browser language.
* Arbitrary number of arguments to replace the tokenized string. For example, "Your display resolution is {0} x {1}." can be replaced with "Your display resolution is 1024 x 768."

