var gulp = require('gulp');
require('./paths.js');

gulp.task('build', [
  'clean',
  'styles',
  'javascript',
  'vendors',
  'static',
  'fonts',
  'templates',
  'pdf-build',
  'ckeditor-build',
  'leaflet'
]);
