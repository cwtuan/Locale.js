// including plugins
var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");;

// task
gulp.task('minify-js', function() {

    gulp.src('./locale.js').
    pipe(uglify()).
    pipe(rename('locale-1\.0\.min\.js')).
    pipe(gulp.dest('./example//js'));

   
});
