'use strict';

var gulp = require('gulp'),
    del = require('del'),
    path = require('path'),
    plugins = require('gulp-load-plugins')();

/**
 * Styles
 */

gulp.task('styles', function (cb) {
    plugins.rubySass('./src/sass/main.sass', { style: 'compressed' })
        .pipe(plugins.plumber())
        .pipe(plugins.autoprefixer(['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']))
        .pipe(plugins.size({ showFiles: true }))
        .pipe(gulp.dest('./dist/css'))
        .on('end', cb)
        .on('error', plugins.util.log);
});

gulp.task('styles:clean', function (cb) {
    del(['./dist/css/main.css'], cb);
});

gulp.task('styles:watch', function () {
    gulp.watch('./src/sass/**/*.sass', ['styles']);
});

/**
 * Scripts
 */

gulp.task('scripts:vendor', function (cb) {
    gulp.src([
        './bower_components/react/react.js',
        './bower_components/socket.io-client/socket.io.js',
        './bower_components/moment/moment.js'
    ])
        .pipe(plugins.concat('vendor.js'))
        .pipe(plugins.uglify({ mangle: false }))
        .pipe(plugins.size({ showFiles: true }))
        .pipe(gulp.dest('./dist/js'))
        .on('end', cb)
        .on('error', plugins.util.log);
});

gulp.task('scripts:main', function (cb) {
    gulp.src('./src/js/**/*.jsx')
        .pipe(plugins.plumber())
        .pipe(plugins.babel())
        .pipe(plugins.jshint())
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.uglify({ mangle: false }))
        .pipe(plugins.size({ showFiles: true }))
        .pipe(gulp.dest('./dist/js'))
        .on('end', cb)
        .on('error', plugins.util.log);
});

gulp.task('scripts', ['scripts:vendor', 'scripts:main']);

gulp.task('scripts:clean', function (cb) {
    del(['./dist/js/vendor.js', './dist/js/main.js'], cb);
});

gulp.task('scripts:watch', function () {
    gulp.watch('./src/js/**/*.jsx', ['scripts:main']);
});

/**
 * Index
 */

gulp.task('index', function (cb) {
    gulp.src('./src/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest('./dist/'))
        .on('end', cb)
        .on('error', plugins.util.log);
});

gulp.task('index:watch', function () {
    gulp.watch('./src/index.html', ['index']);
});

gulp.task('index:clean', function (cb) {
    del('./dist/index.html', cb);
});

/**
 * So let's go
 */

gulp.task('clean', ['styles:clean', 'scripts:clean', 'index:clean']);
gulp.task('watch', ['styles:watch', 'scripts:watch', 'index:watch']);
gulp.task('build', ['styles', 'scripts', 'index']);
gulp.task('default', ['clean', 'build', 'watch']);
