var gulp = require('gulp'),
    connectLogger = require('connect-logger'),
    connectHistoryApiFallback = require('connect-history-api-fallback');

var env = process.env.NODE_ENV || 'dev',
    dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;

gulp.task('serve', ['build'], function() {
  return gulp.browserSync.init({
    server: {
      baseDir: dest
    },
    middleware: [connectLogger(), connectHistoryApiFallback()]
  });
});
