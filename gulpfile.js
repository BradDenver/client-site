var http       = require('http'),
connect    = require('connect'),
path       = require('path'),
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

gulp.task('jekyll', function() {
  jekyll = spawn('jekyll', ['build', '--drafts', '--future']);

  jekyll.stdout.on('data', function (data) {
    console.log('jekyll:\t' + data); // works fine
  });
});

gulp.task('watch', function() {
  /*var server = livereload();

  var reload = function(file) {
    server.changed(file.path);
  };*/
 livereload.listen();

  gulp.watch('less/**', ['styles']);
  gulp.watch(['*.html', '*/*.html', '*/*.md', '!_site/**', '!_site/*/**'], ['jekyll']);
  gulp.watch(['_site/**']).on('change', livereload.changed);
});

gulp.task('serve', function() {
  var app = connect()
  .use(require('connect-livereload')({port: 35729}))
  .use(connect.logger('dev'))
  .use(connect.static(path.resolve('_site')));

  http.createServer(app).listen(4000);
});

gulp.task('build', ['fonts', 'styles', 'jekyll']);
gulp.task('default', ['watch', 'serve']);
