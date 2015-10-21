import del from 'del';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import mocha from 'gulp-mocha';

gulp.task('default', ['clean', 'copy-assets']);

gulp.task('clean', function (cb) {
  del.sync('public', { force: true });
  cb();
});

gulp.task('test', () => {
  gulp.src(['./spec/**/*.js', './app/**/*.spec.js'])
    .pipe(plumber())
    .pipe(mocha());
});

gulp.task('watch-test', ['test'], () => {
  gulp.watch('./app/**/*.js', ['test']);
});

gulp.task('copy-assets', function () {
  gulp.src(['assets/css/**/*']).pipe(gulp.dest('public'));
  gulp.src(['assets/favicons/*']).pipe(gulp.dest('public'));
  gulp.src(['assets/images/**/*']).pipe(gulp.dest('public/images'));
  gulp.src(['layouts/**/*']).pipe(gulp.dest('public'));
});
