import gulp from 'gulp';
import concat from 'gulp-concat';
import uglifyEs from 'gulp-uglify-es';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import del from 'del';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';

const { src, dest, watch, series, parallel } = gulp;
const uglify = uglifyEs.default;
const sass = gulpSass(dartSass);
const server = browserSync.create();

// Compile SCSS into CSS
function styles() {
  return src('app/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(concat('style.min.css'))
    .pipe(dest('dist/css'))
    .pipe(server.stream());
}

// Bundle and minify JavaScript
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/ui/dist/fancybox.umd.js', // Updated Fancybox path
    'app/js/**/*.js'
  ], { allowEmpty: true }) // Added allowEmpty option
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(server.stream());
}

// Optimize images
function images() {
  return src('app/images/**/*', { allowEmpty: true })
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
    .pipe(server.stream());
}

// Copy HTML files
function html() {
  return src('app/*.html', { allowEmpty: true })
    .pipe(dest('dist'))
    .pipe(server.stream());
}

// Clean dist directory
async function cleanDist() {
  return del(['dist']);
}

// Watch for changes
function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html'], html);
  watch(['app/images/**/*'], images);
}

// BrowserSync server
function browsersync() {
  server.init({
    server: {
      baseDir: 'dist'
    },
    notify: false,
    open: true
  });
}

// Export tasks
export const build = series(cleanDist, parallel(html, styles, scripts, images));
export default parallel(build, browsersync, watching);

