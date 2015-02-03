'use strict';

/**
 * Dependencies
 */
var gulp         = require('gulp');
var path         = require('path');
var stylus       = require('gulp-stylus');
var nib          = require('nib');
var jadeify      = require('jadeify');
var browserify   = require('browserify');
var fs           = require('fs');
var pkg          = require('./package');
var dependencies = Object.keys(pkg.dependencies);


gulp.task('default', ['js', 'watch']);
gulp.task('js', ['js:vendor', 'js:app']);
gulp.task('watch', ['watch_js']);


gulp.task('js:app', function() {
  var b = browserify({ debug: true })
    .transform(jadeify)
    .external(dependencies)
    .add('./js/app.js')
    .bundle()
    .on('error', function (err) { console.error(err.message); })
    .pipe(fs.createWriteStream(path.resolve('./public/app.js')))
  ;
});

// compile all package.json dependencies to vendor js
gulp.task('js:vendor', function() {
  var b = browserify({ debug: true })
    .require(dependencies)
    .bundle()
    .on('error', function (err) { console.error(err.message); })
    .pipe(fs.createWriteStream(path.resolve('./public/vendor.js')))
  ;
});


// watch for js
gulp.task('watch_js', function() {
  gulp.watch(['./js/**/*.js', './js/**/*.jade'], ['js:app'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
