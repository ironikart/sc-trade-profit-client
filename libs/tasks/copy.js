'use strict';
var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

gulp.task('html', function() {
    var files = 'src/html/*.html';
    return gulp.src(files)
        //.pipe(watch(files))
        .pipe(gulp.dest('build'));
});

gulp.task('styles', function() {
    return gulp.src('src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build'));
});

gulp.task('copy', ['html', 'styles']);