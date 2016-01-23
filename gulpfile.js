'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

gulp.task('sass', function () {
  gulp.src('./public/bower_components/foundation-apps/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({compatibility: 'ie9'}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('default', function () {
  gulp.watch('./public/bower_components/foundation-apps/scss/**/*.scss', ['sass']);
});
