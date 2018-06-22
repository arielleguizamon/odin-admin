var gulp = require('gulp'),
    util = require('gulp-util'),
    htmlmin = require('gulp-htmlmin');

var src = gulp.paths.src,
    env = process.env.NODE_ENV || 'dev',
    dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;

gulp.task('templates', function() {
  return gulp.src(gulp.paths.templates, {base: src})
    .pipe((env === 'dev') ? util.noop() : htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(dest));
});
