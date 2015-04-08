'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');

var files = {
  src: ['./lib/**/*.js'],
  test: ['./test/**/*.spec.js']
};

gulp.task('lint', function () {
    return gulp.src(files.src.concat(files.test))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task('test', function () {
    return gulp.src(files.test, {read: false})
      .pipe(mocha({reporter: 'dot'}));
});

gulp.task('spec', function () {
    return gulp.src(files.test, {read: false})
      .pipe(mocha({reporter: 'spec'}));
});

gulp.task('coverage', function (done) {
    gulp.src(files.src)
      .pipe(istanbul())
      .pipe(istanbul.hookRequire())
      .on('finish', function () {
          gulp.src(files.test)
              .pipe(mocha({reporter: 'dot'}))
              .pipe(istanbul.writeReports({
                  dir: './coverage',
                  reporters: ['lcov', 'json', 'html'],
                  reportOpts: { dir: './coverage' }
                }))
              .on('end', done);
      });
});
