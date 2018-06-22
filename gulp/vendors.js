var gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    useref = require('gulp-useref'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    rename = require('gulp-rename'),
    nano = require('gulp-cssnano');

var src = gulp.paths.src,
    env = process.env.NODE_ENV || 'dev',
    dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;

gulp.task('vendors', ['base-url', 'static', 'styles'], function() {
    return gulp.src(dest + '/index.html')
    .pipe(useref({ searchPath: ['.', src] },
      lazypipe().pipe(sourcemaps.init, { loadMaps: true }))
    )
    .pipe(gulpif('*.js', (env === 'dev') ? util.noop() : uglify()))
    .pipe(gulpif('*.css', (env === 'dev') ? util.noop() : nano()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest));
});
