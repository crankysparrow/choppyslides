const gulp = require('gulp');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const del = require('del');

const clean = () => {
  return del(['dist']);
}

const styles = () => {
  return gulp.src('./src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
}

const refresh = (cb) => {
  livereload.reload();
  cb();
}

const watch = () => {
  livereload.listen();
  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('*.html', refresh);
  gulp.watch('*.js', refresh);
}

exports.dev = gulp.series(clean, styles, watch);
