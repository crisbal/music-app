var gulp = require('gulp');

var minifyHTML = require("gulp-minify-html");
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');

var minifyCSS = require("gulp-minify-css");
var sass = require("gulp-sass");
var autoprefix = require('gulp-autoprefixer');
var csscomb = require("gulp-csscomb");

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");

gulp.task('buildHTML', function () {

  render.nunjucks.configure("./src/html/", {watch: false });

  gulp.src(['./src/html/**/*.html'])
  .pipe(inject(gulp.src(bowerFiles(), {read: false, cwd: "./build/"}), {name: 'bower'}))
  .pipe(inject(gulp.src('css/*.css', {read: false, cwd: "./build/"})))
  .pipe(inject(gulp.src('js/**/*.js', {read: false, cwd: "./build/"})))
  .pipe(minifyHTML())
  .pipe(gulp.dest('./build/'));
});


gulp.task('buildCSS', function () {
  gulp.src('./src/scss/style.scss')
  .pipe(sass())
  .pipe(autoprefix('last 2 versions'))
  .pipe(csscomb())
  .pipe(minifyCSS())
  .pipe(gulp.dest('./build/css/'));
});


gulp.task('buildIMG', function () {
  gulp.src('./src/img/**/*')
  .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
    }))
  .pipe(gulp.dest('./build/img/'));
});


gulp.task('buildJS', function () {
  gulp.src('./src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter())
  .pipe(uglify())
  .pipe(gulp.dest('./build/js/'));
});

gulp.task('browser-sync', function() {
  var browserSync = require('browser-sync').create();
  browserSync.init({
    server: {
        baseDir: "./build/"
    }
  });

  gulp.watch("build/**/*").on('change', browserSync.reload);

});

gulp.task('default', ['browser-sync', 'buildHTML','buildCSS','buildJS','buildIMG'], function() {
    
    var watch = require('gulp-watch');
    
    watch('./src/html/**/*.html', function() {
      gulp.start('buildHTML');
    });

    watch('./src/scss/**/*.scss', function() {
      gulp.start('buildCSS');
    });

    watch('./src/js/**/*.js', function() {
      gulp.start('buildJS');
    });

    watch('./src/img/**/*', function() {
      gulp.start('buildIMG');
    });

});
