var gulp = require('gulp'),
    del = require('del');

gulp.task('clean', function () {
  var env = process.env.NODE_ENV || 'dev',
      dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;
  del.sync([dest]);
});
