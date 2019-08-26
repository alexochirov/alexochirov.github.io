const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpBrowserSync = require('browser-sync');
const del = require('del');
const gulpWait = require('gulp-wait2');
const inlineCss = require('gulp-inline-css');
const rimraf = require('gulp-rimraf');
const inlineSource = require('gulp-inline-source');
const tinypng = require('gulp-tinypng-unlimited');


const path = {
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
let browserSync = () =>
  gulpBrowserSync.init({
    server: {
      baseDir: "dist"
    }
  });

let reloadBrowser = () => gulp.src(path.src.html, {
    allowEmpty: true
  }).pipe(gulpWait(50))
  .pipe(gulpBrowserSync.reload({
    stream: true
  }));


let cleanImages = () => del(path.dist.images);
let cleanHTML = () => del(path.dist.html + '*.html');

let helperHTML = () => gulp.src(path.src.html)
  .pipe(inlineSource({
    rootpath: 'src'
  }))
  .pipe(inlineCss({
    preserveMediaQueries: true
  }))
  .pipe(gulp.dest(path.dist.html));

let helperImages = () => gulp.src(path.src.images)
  .pipe(tinypng())
  .pipe(gulp.dest(path.dist.images));
let helperImagesNotMinify = () => gulp.src(path.src.images)
  .pipe(gulp.dest(path.dist.images));

let helperStyle = () => gulp.src(path.src.style)
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(gulp.dest(path.src.stylepack));


let images = gulp.series(
  cleanImages,
  helperImages,
  reloadBrowser
);
let imagesNotMinify = gulp.series(
  cleanImages,
  helperImagesNotMinify,
  reloadBrowser
);
let sassTask = gulp.series(
  cleanHTML,
  helperStyle,
  reloadBrowser
);

let inliner = gulp.series(
  sassTask,
  helperHTML,
  reloadBrowser
);




let watch = () => {
  gulp.watch(path.src.stylepack + '/**/*.scss', gulp.series(inliner));
  gulp.watch(path.src.html, gulp.series(inliner));
  gulp.watch(path.src.images, gulp.series(imagesNotMinify));


};







// Build Sequences
// ---------------

gulp.task('default',
  gulp.series(
imagesNotMinify, inliner,
    gulp.parallel(watch,browserSync)
  )
);
gulp.task('minify',
  gulp.series(
    images, inliner
  )
);
