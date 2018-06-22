var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', ['ng-config', 'ng-version', 'pdf-build'], function() {
  var src = gulp.paths.src,
      env = process.env.NODE_ENV || 'dev',
      dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;

  return gulp.src(
      gulp.paths.javascript.filter(function(file) {
        return file.endsWith('.js');
      })
    )
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe((env === 'dev') ? util.noop() : uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});
