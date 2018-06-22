var gulp = require('gulp');

gulp.paths = {
  index: './src/index.html',
  src: './src',
  prod: './dist',
  dev: './tmp',
  templates: [
    './src/views/**/*.html',
    './src/directives/**/*.html',
    './*.html'
  ],
  static: [
    // 'fonts/**/*',
    './src/img/**/*',
    './src/uib/**/*',
    './src/*.{svg,png,xml,ico,txt}',
    './src/config/*.json',
    './manifest.json',
    './src/public/*'
  ],
  javascript: [
    './src/js/**/*.js',
    './config.json',
  ],
  vendors: [
    './src/plugins/**',
    './src/index.html',
  ],
  fonts: [
    './src/fonts/*.woff',
    './src/fonts/*.woff2',
    './src/fonts/*.eot',
    './src/fonts/*.ttf',
    './src/fonts/*.svg',
    './src/fonts/*.otf'
  ],
  styles: [
    './src/css/*.scss',
    './src/css/*.css'
  ]
};
