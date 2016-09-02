'use strict';
/**
 * Sets watch globals so that other tasks can easily change their behaviour if file
 * watching is active (e.g. build)
 */
var gulp = require('gulp');

// Inspired by: https://github.com/tommymarshall/react-multi-step-form/blob/master/gulp/tasks/setWatch.js
gulp.task('setWatch', function() {
    global.sync = require('browser-sync').create();
    global.isWatching = true;
});
