function demo(lang) {
    var content = document.getElementById('content'),
        firstElement = document.getElementById('firstElement'),
        sencodElement = document.getElementById('sencodElement'),
        loadingMask = document.getElementById('loadingMask');

    content.style.display = "none";
    loadingMask.style.display = "block";

    if (lang) {
        Locale.setCurrentLanguage(lang);
    }
    else {
        console.info('if lang is not specified, Locale.js will auto detect the browser perference.');
    }

    Locale.loadAsync(function() {
        content.style.display = "block";
        loadingMask.style.display = "none";

        firstElement.innerHTML = Locale.getMsg('introudction');
        sencodElement.innerHTML = '<ul>' +
            '<li>' + Locale.getMsg('feature1') + '</li>' +
            '<li>' + Locale.getMsg('feature2') + '</li>' +
            '<li>' + Locale.getMsg('feature3') + '</li>' +
            '<li>' + Locale.getMsg('feature4', screen.width, screen.height) + '</li>' +
            '</ul>';
        thirdElement.innerHTML = Locale.getMsg('moreInfo', 'https://github.com/cwtuan/Locale.js');

    });

}
