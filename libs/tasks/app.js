'use strict';
var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var envify = require('envify/custom');
var src = 'src/app/index.jsx';
var b;

var watchified = false;

function doBundle() {
    var watchify = require('watchify');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var bundle = b;

    if (global.isWatching && !watchified) {
        bundle = watchify(b);
        watchified = true;
    }

    gutil.log((global.isWatching ? 'Watchify' : 'Browserify') + ' building entry file:', path.basename(src));
    return bundle.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'))
        .on('finish', function() {
            if (global.isWatching && global.sync) {
                global.sync.reload();
            }
        });
}

gulp.task('browserify', function() {
    var browserify = require('browserify');
    b = browserify({
        entries: [src],
        debug:   true
    });

    if (process.env.NODE_ENV === 'production') {
        b.transform({
            global: true
        }, 'uglifyify');
    }

    b.transform(envify({
        NODE_ENV: process.env.NODE_ENV
    }));

    b.on('update', doBundle);
    b.on('log', gutil.log.bind(gutil, 'Browserify'));

    return doBundle();
});
