/*global require:true */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jade = require('gulp-jade');
var compression = require('compression');


// Compile Sass into CSS and minify it
gulp.task('sass', function(){
  return gulp.src('./src/scss/**/*.scss')
  .pipe(sass())
  .pipe(autoprefixer({}))
  .pipe(concat('main.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('./assets/css'))
  .pipe(reload({stream: true}));
});

// Compile Jade templates into HTML
gulp.task('templates', function(){
  return gulp.src('./src/jade/**/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./assets/partials'));
});

// Watch compiled jade templates
gulp.task('jade-watch', ['templates'], reload);

//Compile JavaScripts and minify
gulp.task('scripts', function(){
  return gulp.src([
    './src/javascripts/app.js'
  ])
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./assets/javascripts'))
  .pipe(reload({stream: true}));
});


// Run this to start server with livereload
gulp.task('default',['sass','templates'], function(){
  browserSync({
    server: './',
    middleware: [compression()]
  });

  gulp.watch('./src/scss/**/*.scss',['sass']);
  gulp.watch('./src/javascripts/**/*.js',['scripts']);
  gulp.watch('./src/jade/**/*.jade',['jade-watch']);
  gulp.watch('./*.html').on('change', reload);
});
