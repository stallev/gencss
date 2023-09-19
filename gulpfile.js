'use strict';

const gulp = require('gulp');

const sass = require('gulp-sass')(require('node-sass'));
const sassGlob = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const nunjucksRender = require('gulp-nunjucks-render');
const assetsPath = 'assets/';

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const imageminWebp = require('imagemin-webp');

const paths =  {
  src: './src/',
  build: './build/',
  assets: './src/assets/',
  blocks: './src/templates/',
  wp: '../../OpenServer/domains/testwoo/wp-content/themes/twootheme/assets/',
};

function styles() {
  return gulp.src(paths.assets + 'scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass()) // { outputStyle: 'compressed' }
    .pipe(groupMediaQueries())
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 version']}),
    ]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(paths.build + 'css/'))
    .pipe(gulp.dest(paths.wp + 'css/'));
}

function svgSprite() {
  return gulp.src(paths.assets + 'svg/*.svg')
    .pipe(svgmin(function (file) {
      return {
        plugins: [{
          cleanupIDs: {
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite-svg.svg'))
    .pipe(gulp.dest(paths.build + 'img/'));
}

function scripts() {
  return gulp.src(paths.assets + 'js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    // .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
    .pipe(gulp.dest(paths.wp + 'js/'))
}

function jsLibs() {
  return gulp.src(paths.assets + 'js/libs/*.js')
    .pipe(gulp.dest(paths.build + 'js/libs/'))
    .pipe(gulp.dest(paths.wp + 'js/libs/'))
}

function copyFonts() {
  return gulp.src(paths.assets + 'fonts/*.{woff,woff2}')
    .pipe(plumber())
    .pipe(gulp.dest(paths.build + 'fonts/'))
    .pipe(gulp.dest(paths.wp + 'fonts/'))
}

function scriptsVendors() {
  return gulp.src(paths.src + assetsPath + 'js/vendor/*.js')
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
    .pipe(gulp.dest(paths.wp + 'js/'))
}

function htmls() {
  return gulp.src(paths.src + '*.html')
    .pipe(plumber())
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(nunjucksRender({path: paths.src}))
    .pipe(gulp.dest(paths.build));
}

function images() {
  return gulp.src(paths.assets + 'img/**/*.{jpg,jpeg,png,gif,svg,ico}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 10}),
    ]))
    .pipe(gulp.dest('build/img'))
    .pipe(gulp.dest(paths.wp + 'img/'));
};

function toWebp() {
  return gulp.src(paths.assets + 'img/**/*.{jpg,jpeg,png}')
    .pipe(webp())
    .pipe(gulp.dest('build/img'));
};

function toWebp2() {
  return gulp.src(paths.assets + 'img/**/*.{jpg,jpeg,png}')
    .pipe(imagemin([
      imageminWebp({
        quality: 75 // Качество WebP изображений (0-100)
      })
    ]))
    .pipe(gulp.dest('build/img'));
};

function clean() {
  return del('build/')
}

function watch() {
  gulp.watch(paths.assets + 'scss/**/*.scss', styles);
  gulp.watch(paths.assets + 'js/**/*.js', scripts);
  gulp.watch(paths.src + '**/*.html', htmls);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: paths.build
    }
  });
  browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.scriptsVendors = scriptsVendors;
exports.jsLibs = jsLibs;
exports.htmls = htmls;
exports.images = images;
exports.svgSprite = svgSprite;
exports.clean = clean;
exports.watch = watch;

gulp.task('build', gulp.series(
  clean,
  gulp.parallel(styles, scripts, scriptsVendors, jsLibs, htmls, copyFonts, images, toWebp)
));

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, scripts, scriptsVendors, jsLibs, htmls, copyFonts, images, toWebp),
  gulp.parallel(watch, serve)
));
