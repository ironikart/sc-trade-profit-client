'use strict';
var gulp = require('gulp');

gulp.task('build', ['clean', 'browserify', 'copy', 'sass']);