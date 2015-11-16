var gulp = require('gulp'),
    rsass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    del = require('del');

gulp.task('clean', function(cb) {
    return del(['style.css'], cb); //有return表示要等这个任务完成后才开始其他任务
});

gulp.task('rsass', function () {
  return rsass('style.scss', { sourcemap: true })
    .on('error', rsass.logError)
    .pipe(autoprefixer('last 4 versions', '> 1%', 'ie 8'))
    .pipe(gulp.dest(''));
});

gulp.task('watch',function(){
  // Watch our sass files
  gulp.watch(['*.scss'], [
    'rsass'
  ]);
});

gulp.task('min', ['rsass'], function(){
  gulp.src('style.css')
  .pipe(minifycss())
  .pipe(gulp.dest('./'));
});