var del = require('del');
var gulp = require('gulp');

gulp.task('default', ['clean', 'copy-assets']);

gulp.task('clean', function (cb) {
  del.sync('public', {force: true});
  cb();
});

gulp.task('copy-assets', function () {
  gulp.src(['assets/css/**/*']).pipe(gulp.dest('public'));
  gulp.src(['assets/favicons/*']).pipe(gulp.dest('public'));
  gulp.src(['assets/images/**/*']).pipe(gulp.dest('public/images'));
  gulp.src(['layouts/**/*']).pipe(gulp.dest('public'));
});

