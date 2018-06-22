var gulp = require('gulp'),
    fs = require('fs'),
    template = require('gulp-template');

gulp.task('base-url', function() {
  var env = process.env.NODE_ENV || 'dev',
      configFile = fs.existsSync('config.local.json')
        ? '../config.local.json'
        : '../config.json',
      config = require(configFile);

  var dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;
  return gulp.src(gulp.paths.index)
    .pipe(template({ baseUrl: config[env].BaseHTML5.url }))
    .pipe(gulp.dest(dest));
});
