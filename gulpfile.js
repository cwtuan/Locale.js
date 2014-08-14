// including plugins
var gulp = require('gulp'),
    uglify = require("gulp-uglify");

// task
gulp.task('minify-js', function() {
    gulp.src('./locale.js') 
    .pipe(uglify()).pipe(gulp.dest('./locale-min.js'));
});