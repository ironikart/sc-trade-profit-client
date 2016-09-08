'use strict';
var gulp = require('gulp');

gulp.task('copyHTML', function() {
    return gulp.src('src/html/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('copyImages', function() {
    return gulp.src('src/styles/images/*.*')
        .pipe(gulp.dest('build/images'));
});

gulp.task('copy', ['copyHTML', 'copyImages']);