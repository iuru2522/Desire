// const { src, dest, watch, parallel, series } = require('gulp');
// const sass = require('gulp-dart-sass');
// const concat = require('gulp-concat');
// const browserSync = require('browser-sync').create();
// const uglify = require('gulp-uglify-es').default;
// import autoPrefixer from 'gulp-autoprefixer';
// // const autoprefixer = require('gulp-autoprefixer');
// const imagemin = require('gulp-imagemin');
// const del = require('del');

// // Live server for local development
// function browsersync() {
//   browserSync.init({
//     server: {
//       baseDir: 'dist/'
//     }
//   });
// }

// // Clean the 'dist' folder
// function cleanDist() {
//   return del('dist');
// }

// // Optimize images and move them to 'dist/images'
// function images() {
//   return src('app/images/**/*')
//     .pipe(imagemin([
//       imagemin.gifsicle({ interlaced: true }),
//       imagemin.mozjpeg({ quality: 75, progressive: true }),
//       imagemin.optipng({ optimizationLevel: 5 }),
//       imagemin.svgo({
//         plugins: [
//           { removeViewBox: true },
//           { cleanupIDs: false }
//         ]
//       })
//     ]))
//     .pipe(dest('dist/images'));
// }

// // Bundle and minify JavaScript, then move to 'dist/js'
// function scripts() {
//   return src([
//     'node_modules/jquery/dist/jquery.js',
//     'node_modules/slick-carousel/slick/slick.js',
//     'node_modules/mixitup/dist/mixitup.js',
//     'node_modules/@fancyapps/ui/',
//     'app/js/main.js'
//   ])
//     .pipe(concat('main.min.js'))
//     .pipe(uglify())
//     .pipe(dest('dist/js'))
//     .pipe(browserSync.stream());
// }

// // Compile SCSS, autoprefix, minify CSS, and move to 'dist/css'
// function styles() {
//   return src('app/scss/style.scss')
//     .pipe(sass({ outputStyle: 'compressed' }))
//     .pipe(concat('style.min.css'))
//     .pipe(autoprefixer({
//       overrideBrowserslist: ['last 10 versions'],
//       grid: true
//     }))
//     .pipe(dest('dist/css'))
//     .pipe(browserSync.stream());
// }

// // Copy HTML files to 'dist'
// function html() {
//   return src('app/*.html')
//     .pipe(dest('dist'))
//     .pipe(browserSync.stream());
// }

// // Watch for changes during development
// function watching() {
//   watch(['app/scss/**/*.scss'], styles);
//   watch(['app/js/**/*.js', '!dist/js/main.min.js'], scripts);
//   watch(['app/*.html'], html);
// }

// // Build task to clean, then copy all assets to 'dist'
// exports.build = series(cleanDist, parallel(styles, scripts, images, html));

// // Default task to run everything for development
// exports.default = parallel(styles, scripts, html, images, browsersync, watching);





// Commented out CommonJS-style require statements
// const { src, dest, watch, parallel, series } = require('gulp');
// const sass = require('gulp-dart-sass');
// const concat = require('gulp-concat');
// const browserSync = require('browser-sync').create();
// const uglify = require('gulp-uglify-es').default;
// const autoprefixer = require('gulp-autoprefixer');
// const imagemin = require('gulp-imagemin');
// const del = require('del');

// Watch for changes during development
function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!dist/js/main.min.js'], scripts);
  watch(['app/*.html'], html);
}

// Build task to clean, then copy all assets to 'dist'
exports.build = series(cleanDist, parallel(styles, scripts, images, html));

// Default task to run everything for development
exports.default = parallel(styles, scripts, html, images, browsersync, watching);

// Added ES module import statements
import { src, dest, watch, parallel, series } from 'gulp';
import sass from 'gulp-dart-sass';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify-es';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import del from 'del';

// Live server for local development
function browsersync() {
  browserSync.create().init({
    server: {
      baseDir: 'dist/'
    }
  });
}

// Clean the 'dist' folder
function cleanDist() {
  return del('dist');
}

// Optimize images and move them to 'dist/images'
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

// Bundle and minify JavaScript, then move to 'dist/js'
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/ui/',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify.default())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// Compile SCSS, autoprefix, minify CSS, and move to 'dist/css'
function styles() {
  return src('app/scss/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

// Copy HTML files to 'dist'
function html() {
  return src('app/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}
