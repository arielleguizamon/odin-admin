var gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    util = require('gulp-util'),
    concatCss = require('gulp-concat-css'),
    del = require('del'),
    useref = require('gulp-useref'),
    sourcemaps = require('gulp-sourcemaps'),
    nano = require('gulp-cssnano');

var src = gulp.paths.src,
    env = process.env.NODE_ENV || 'dev',
    dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;


gulp.task('styles', function() {
    // del.sync([gulp.paths.cleancss]);
    return gulp.src(gulp.paths.styles)
        .pipe(plumber())
        .pipe(useref({
                searchPath: '.'
            },
            lazypipe().pipe(sourcemaps.init, {
                loadMaps: true
            })))
        .pipe(sass())
        .pipe(concatCss('styles.min.css'))
        .pipe(rename('styles.min.css'))
        .pipe(cleanCSS())
        .pipe((env === 'dev') ? util.noop() : nano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest))
        .pipe(gulp.browserSync.stream());
});
