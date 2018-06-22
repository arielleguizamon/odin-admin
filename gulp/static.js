var gulp = require('gulp');

var src = gulp.paths.src,
    env = process.env.NODE_ENV || 'dev',
    dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;

gulp.task('static', function() {
  return gulp.src(gulp.paths.static, { base: src })
    .pipe(gulp.dest(dest));
});
