var express    = require('express'),
spawn      = require('child_process').spawn,
gulp       = require('gulp'),
plumber    = require('gulp-plumber'),
less       = require('gulp-less'),
livereload = require('gulp-livereload'),
prefix     = require('gulp-autoprefixer');

gulp.task('styles', function() {
  var styles = gulp.src('assets/_less/main.less')
  .pipe(plumber())
  .pipe(less({"compress": true}))
  .pipe(prefix())
  .pipe(gulp.dest('assets/css/'));

  return styles;
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src([
    'bower_components/bootstrap/dist/fonts/glyphicons*.*'])
    .pipe(gulp.dest('assets/fonts/'));
});

// Javascript
gulp.task('js', function() {
  return gulp.src([
    'bower_components/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest('assets/js/'));
});

gulp.task('jekyll', function() {
  jekyll = spawn('jekyll', ['build', '--drafts', '--future']);

  jekyll.stdout.on('data', function (data) {
    console.log('jekyll:\t' + data); // works fine
  });
});

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch('less/**', ['styles']);
  gulp.watch(['*.html', '*/*.html', '*/*.md', '!_site/**', '!_site/*/**'], ['jekyll']);
  gulp.watch(['_site/**']).on('change', livereload.changed);
});

gulp.task('serve', function() {
  var server = express()
    .use(require('connect-livereload')({port: 35729}))
    .use('/client-site/', express.static('_site/'))
    .listen(4000);
});

gulp.task('build', ['fonts', 'js', 'styles', 'jekyll']);
gulp.task('default', ['watch', 'serve']);
