// including plugins
var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");;

// task
gulp.task('minify-js', function() {

    gulp.src('./locale.js').
    pipe(uglify()).
    pipe(rename('locale-min.js')).
    pipe(gulp.dest('./dist'));

   
});

//   gulp.src('./dist/assets/css/main.css')
//         .pipe(minifycss())
//         .pipe(rename('main.min.css'))
//         .pipe(gulp.dest('./dist/assets/css/'));