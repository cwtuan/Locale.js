// including plugins
var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    fs = require('fs'),
    concat = require("gulp-concat"),
    header = require("gulp-header");

var getLicense = function() {
    return '' + fs.readFileSync('LICENSE');
};
var getVersion = function() {
    return fs.readFileSync('VERSION');
};

gulp.task('minify-js', function() {
    var version = getVersion(),
        proudctionName = 'locale-' + version + '.min.js',
        dest = './example/js',
        src = './locale.js';

    gulp.src(src) // path to your files
        .pipe(rename(proudctionName))
        .pipe(uglify())
        .pipe(header(getLicense(), {
            version: version,
            build: (new Date()).toUTCString()
        }))
        .pipe(gulp.dest(dest));
});
