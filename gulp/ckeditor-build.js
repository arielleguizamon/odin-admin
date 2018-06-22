var gulp = require('gulp'),
    util = require('gulp-util'),
    uglify = require('gulp-uglify');

var src = gulp.paths.src,
    env = process.env.NODE_ENV || 'dev',
    dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;

gulp.task('ckeditor-build', function () {
    return gulp.src(src + '/plugins/ckeditor/**/**')
            //.pipe((env === 'dev') ? util.noop() : uglify())
            .pipe(gulp.dest(dest + '/plugins/ckeditor'));
});
