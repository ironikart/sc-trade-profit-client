'use strict';
var gulp = require('gulp');

gulp.task('copyHTML', function() {
    return gulp.src('src/html/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('copy', ['copyHTML']);