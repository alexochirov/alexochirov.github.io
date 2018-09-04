var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  gulpIf = require('gulp-if'),
  minifyCSS = require('gulp-minify-css'),
  cache = require('gulp-cache'),
  del = require('del'),
  runSequence = require('run-sequence'),
  imagemin = require('gulp-imagemin'),
  imageminJpg = require('imagemin-jpeg-recompress'),
  imageminPng = require('imagemin-pngquant'),
  pxtorem = require('postcss-pxtorem'),
  postcss = require('gulp-postcss'),
  wait = require('gulp-wait2'),
  inlineCss = require('gulp-inline-css'),
  rimraf = require('gulp-rimraf'),
  imageop = require('gulp-image-optimization');


var path = {
  dist: {
    html: 'dist',
    css: 'dist/css',
    images: 'dist/images/',
  },
  src: {
    html: 'src/*.html',
    style: 'src/css/style.scss',
    stylepack: 'src/css',
    images: 'src/images/**/*.{gif,jpg,png,svg}'
  },

};

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
});
gulp.task('clean-images', function() {
  return gulp.src(path.dist.images, {
    read: false
  }).pipe(rimraf());

});
gulp.task('clean-html', function() {
  gulp.src(path.dist.html + '*.html', {
    read: false
  }).pipe(rimraf());

});
gulp.task('images', ['clean-images'], function() {
  return gulp.src(path.src.images)
    .pipe(imagemin(
      [imageminPng(), imageminJpg()], {
        verbose: true
      }
    ))
    .pipe(gulp.dest(path.dist.images))
    .pipe(wait(200))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('sass', ['clean-html'], function(done) {
  return gulp.src(path.src.style)
    .pipe(sass({
        outputStyle: 'compressed'
      })
      .on('error', function(error) {
        done(error);
      })
    )
    .pipe(gulp.dest(path.src.stylepack))
    .on('end', function() {
      done();
    })
    .pipe(gulp.dest(path.dist.css));
});
gulp.task('helper', ['sass'], function(done) {
  return gulp.src(path.src.html)
    .pipe(gulp.dest(path.dist.html))
    .pipe(wait(50))
    .pipe(browserSync.reload({
      stream: true
    }));
});




// Watchers
gulp.task('watch', function() {
  gulp.watch(path.src.stylepack + '/**/*.scss', ['helper']);
  gulp.watch(path.src.html, ['helper']);
  gulp.watch(path.src.images, ['images']);

});


// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['browserSync', 'watch', 'helper', 'images'], //
    callback
  );
});
