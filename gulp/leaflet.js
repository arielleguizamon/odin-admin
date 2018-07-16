var gulp = require('gulp');

var src = gulp.paths.src,
    env = process.env.NODE_ENV || 'dev',
    dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;

gulp.task('leaflet', function() {
  return gulp.src(src + '/plugins/leaflet/images/**')
    .pipe(gulp.dest(dest + '/img/leaflet'));
});
