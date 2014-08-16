# Locale.js
A simple Javascript localization tool. It translates 


            var lang;
            Locale.setLanguageUrls(['langs/lang_en_US.txt', 'langs/lang_zh_TW.txt']);

            lang = 'en_US';
            Locale.useLanguage(lang);
            Locale.load();
            document.write(lang + ': ' + Locale.getMsg('common.hello', 'Tony', 'tony@example.com') + '<BR/>');

            lang = 'zh_TW';
            Locale.useLanguage(lang);
            Locale.load();
            document.write(lang + ': ' + Locale.getMsg('common.hello', 'Tony', 'tony@example.com') + '<BR/>');