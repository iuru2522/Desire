const { src, dest, watch, parallel, series } = require('gulp');

// Import Dart Sass properly
const sass = require('gulp-dart-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

// BrowserSync: Live reload for changes
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

// Clean the dist folder
function cleanDist() {
  return del('dist');
}

// Optimize images
function images() {
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'));
}

// Bundle and minify JS files
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/ui/',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

// Compile, autoprefix, and minify SCSS
function styles() {
  return src('app/scss/style.scss')
    .pipe(sass({ outputStyle: 'compressed' })) // Use gulp-dart-sass correctly
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

// Copy necessary files to dist
function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], { base: 'app' })
    .pipe(dest('dist'));
}

// Watch for changes and reload browser
function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);
exports.watching = watching;
exports.browsersync = browsersync;
exports.default = parallel(styles, scripts, browsersync, watching);
