'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var open = require('gulp-open');

var src = {
  lib: ['./lib/**/*.js'],
  test: ['./test/**/*.spec.js']
};

gulp.task('test', function () {
    return gulp.src(src.test, {read: false})
      .pipe(mocha({reporter: 'dot'}));
});

gulp.task('spec', function () {
    return gulp.src(src.test, {read: false})
      .pipe(mocha({reporter: 'spec'}));
});

gulp.task('coverage', function (done) {
    gulp.src(src.lib)
      .pipe(istanbul())
      .pipe(istanbul.hookRequire())
      .on('finish', function () {
          gulp.src(src.test)
              .pipe(mocha({reporter: 'dot'}))
              .pipe(istanbul.writeReports({
                  dir: './coverage',
                  reporters: ['lcov', 'json', 'html'],
                  reportOpts: { dir: './coverage' }
                }))
              .on('end', done);
      });
});

gulp.task('open', function(){
    gulp.src('./coverage/index.html')
      .pipe(open('<%file.path%>'));
});
