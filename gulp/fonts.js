var gulp = require('gulp');

var src = gulp.paths.src,
    env = process.env.NODE_ENV || 'dev',
    dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;

gulp.task('fonts', function() {
    return gulp.src(gulp.paths.fonts)
            .pipe(gulp.dest(dest + '/fonts'));
});
