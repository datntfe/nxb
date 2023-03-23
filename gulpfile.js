"use strict";

const gulp = require('gulp'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      sass   = require('gulp-sass')(require('sass')),
      sourcemaps = require('gulp-sourcemaps'),
      del = require('del'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create(),
      htmlreplace = require('gulp-html-replace'),
      cssmin = require('gulp-cssmin'),
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant');

function concatScripts() {
  return gulp.src([
    'assets/js/vendor/jquery-2.2.0.min.js',
    'assets/js/vendor/popper.min.js',
    'assets/js/vendor/slick.js',
    'assets/js/vendor/bootstrap.min.js',
    'assets/js/functions.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.stream());
}

function minifyScripts() {
  return gulp.src("assets/js/main.js")
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('dist/assets/js'));
}

function compileSass() {
  return gulp.src("assets/css/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
}

function minifyCss() {
  return gulp.src("assets/css/main.css")
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist/assets/css'));
}

function watchFiles() {
  gulp.watch('assets/css/**/*.scss', compileSass);
  gulp.watch('assets/js/*.js', concatScripts);
}

function clean() {
  return del(['dist', 'assets/css/main.css*', 'assets/js/main*.js*']);
}

function renameSources() {
  return gulp.src(['*.html', '**/*.php', '!dist', '!dist/**'])
    .pipe(htmlreplace({
      'js': 'assets/js/main.min.js',
      'css': 'assets/css/main.min.css'
    }))
    .pipe(gulp.dest('dist/'));
}

function optimizeImages() {
  return gulp.src('assets/img/**/*')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/assets/img'));
}

function build() {
  return gulp.src([
    '*.html',
    '*.php',
    'favicon.ico',
    "assets/fonts/**",
  ], { base: './'})
    .pipe(gulp.dest('dist'));
}

function serve() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("assets/css/**/*.scss", compileSass);
  gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
}

gulp.task('concatScripts', concatScripts);
gulp.task('minifyScripts', gulp.series('concatScripts', minifyScripts));
gulp.task('compileSass', compileSass);
gulp.task('minifyCss', gulp.series('compileSass', minifyCss));
gulp.task('watchFiles', watchFiles);
gulp.task('clean', clean);
gulp.task('renameSources', renameSources);
gulp.task('optimizeImages', optimizeImages);
gulp.task('build', gulp.series(clean, gulp.parallel('minifyScripts', 'minifyCss'), build, renameSources));
gulp.task('serve', gulp.series('compileSass', 'concatScripts', serve));
gulp.task('default', gulp.series('clean', 'build'));
