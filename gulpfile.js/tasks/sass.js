var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var config       = require('../config').sass;


gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});