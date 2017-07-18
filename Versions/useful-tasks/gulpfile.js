'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    browserSync = require('browser-sync'),
    gulpif = require('gulp-if'),
    ignore = require('gulp-ignore'),
    rimraf = require('gulp-rimraf'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    replace = require('gulp-batch-replace'),
    pngquant = require('imagemin-pngquant');

var sassPaths = [
    './node_modules/foundation-sites/scss',
    './node_modules/motion-ui/src',
    './node_modules/font-awesome/scss/',
      './node_modules/fancybox/dist/scss',
    './node_modules/slick-carousel/slick/'
];

var path = {
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        images: 'dist/images/',
        i: 'dist/i/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/pug/*.pug',
        js: 'src/pug/**/_js.html',
        jsHtml: 'dist/*.html',
        css: ['src/scss/style.scss'],//, 'src/scss/style-inline.scss'
        images: 'src/images/**/*.*',
        i: 'src/i/**/*.*',
        fancy: 'node_modules/fancybox/dist/img/*.*',
        fonts: 'src/fonts/**/*.*',
        awesome: 'node_modules/font-awesome/fonts/**/*.*'
    },
    watch: {
        html: ['src/pug/**/*.pug', 'src/pug/**/*.html'],//, 'src/scss/**/*.scss'
        js: ['src/js/**/*.js', 'src/pug/**/_js.html'],
        jsHtml: ['src/pug/**/*.pug', 'src/pug/**/*.html'],//, 'src/scss/**/*.scss'
        css: 'src/scss/**/*.scss',
        images: 'src/images/**/*.*',
        i: 'src/i/**/*.*',
        fonts: 'src/fonts/**/*.*',
        awesome: 'node_modules/font-awesome/fonts/**/*.*'
    }
};
//begin of change from 12 to 24 columns

var way24 = 'src/pug/**/*.pug';
var wayout = 'src/pug/';
var replaceThis = [
  [ '.large-12', '.large-a' ],
[ '.large-11', '.large-b' ],
[ '.large-10', '.large-z' ],
[ '.large-9', '.large-f' ],
[ '.large-8', '.large-d' ],
[ '.large-7', '.large-e' ],
[ '.large-6', '.large-q' ],
[ '.large-5', '.large-r' ],
[ '.large-4', '.large-8' ],
[ '.large-3', '.large-6' ],
[ '.large-2', '.large-4' ],
[ '.large-1', '.large-2' ],
[ '.large-a', '.large-24' ],
[ '.large-b', '.large-22' ],
[ '.large-z', '.large-20' ],
[ '.large-f', '.large-18' ],
[ '.large-d', '.large-16' ],
[ '.large-e', '.large-14' ],
[ '.large-q', '.large-12' ],
[ '.large-r', '.large-10' ],
  [ '.medium-12', '.medium-a' ],
[ '.medium-11', '.medium-b' ],
[ '.medium-10', '.medium-z' ],
[ '.medium-9', '.medium-f' ],
[ '.medium-8', '.medium-d' ],
[ '.medium-7', '.medium-e' ],
[ '.medium-6', '.medium-q' ],
[ '.medium-5', '.medium-r' ],
[ '.medium-4', '.medium-8' ],
[ '.medium-3', '.medium-6' ],
[ '.medium-2', '.medium-4' ],
[ '.medium-1', '.medium-2' ],
[ '.medium-a', '.medium-24' ],
[ '.medium-b', '.medium-22' ],
[ '.medium-z', '.medium-20' ],
[ '.medium-f', '.medium-18' ],
[ '.medium-d', '.medium-16' ],
[ '.medium-e', '.medium-14' ],
[ '.medium-q', '.medium-12' ],
[ '.medium-r', '.medium-10' ],
  [ '.small-12', '.small-a' ],
[ '.small-11', '.small-b' ],
[ '.small-10', '.small-z' ],
[ '.small-9', '.small-f' ],
[ '.small-8', '.small-d' ],
[ '.small-7', '.small-e' ],
[ '.small-6', '.small-q' ],
[ '.small-5', '.small-r' ],
[ '.small-4', '.small-8' ],
[ '.small-3', '.small-6' ],
[ '.small-2', '.small-4' ],
[ '.small-1', '.small-2' ],
[ '.small-a', '.small-24' ],
[ '.small-b', '.small-22' ],
[ '.small-z', '.small-20' ],
[ '.small-f', '.small-18' ],
[ '.small-d', '.small-16' ],
[ '.small-e', '.small-14' ],
[ '.small-q', '.small-12' ],
[ '.small-r', '.small-10' ],
  [ '.small-offset-12', '.small-offset-a' ],
[ '.small-offset-11', '.small-offset-b' ],
[ '.small-offset-10', '.small-offset-z' ],
[ '.small-offset-9', '.small-offset-f' ],
[ '.small-offset-8', '.small-offset-d' ],
[ '.small-offset-7', '.small-offset-e' ],
[ '.small-offset-6', '.small-offset-q' ],
[ '.small-offset-5', '.small-offset-r' ],
[ '.small-offset-4', '.small-offset-8' ],
[ '.small-offset-3', '.small-offset-6' ],
[ '.small-offset-2', '.small-offset-4' ],
[ '.small-offset-1', '.small-offset-2' ],
[ '.small-offset-a', '.small-offset-24' ],
[ '.small-offset-b', '.small-offset-22' ],
[ '.small-offset-z', '.small-offset-20' ],
[ '.small-offset-f', '.small-offset-18' ],
[ '.small-offset-d', '.small-offset-16' ],
[ '.small-offset-e', '.small-offset-14' ],
[ '.small-offset-q', '.small-offset-12' ],
[ '.small-offset-r', '.small-offset-10' ],
  [ '.medium-offset-12', '.medium-offset-a' ],
[ '.medium-offset-11', '.medium-offset-b' ],
[ '.medium-offset-10', '.medium-offset-z' ],
[ '.medium-offset-9', '.medium-offset-f' ],
[ '.medium-offset-8', '.medium-offset-d' ],
[ '.medium-offset-7', '.medium-offset-e' ],
[ '.medium-offset-6', '.medium-offset-q' ],
[ '.medium-offset-5', '.medium-offset-r' ],
[ '.medium-offset-4', '.medium-offset-8' ],
[ '.medium-offset-3', '.medium-offset-6' ],
[ '.medium-offset-2', '.medium-offset-4' ],
[ '.medium-offset-1', '.medium-offset-2' ],
[ '.medium-offset-a', '.medium-offset-24' ],
[ '.medium-offset-b', '.medium-offset-22' ],
[ '.medium-offset-z', '.medium-offset-20' ],
[ '.medium-offset-f', '.medium-offset-18' ],
[ '.medium-offset-d', '.medium-offset-16' ],
[ '.medium-offset-e', '.medium-offset-14' ],
[ '.medium-offset-q', '.medium-offset-12' ],
[ '.medium-offset-r', '.medium-offset-10' ],
  [ '.large-offset-12', '.large-offset-a' ],
[ '.large-offset-11', '.large-offset-b' ],
[ '.large-offset-10', '.large-offset-z' ],
[ '.large-offset-9', '.large-offset-f' ],
[ '.large-offset-8', '.large-offset-d' ],
[ '.large-offset-7', '.large-offset-e' ],
[ '.large-offset-6', '.large-offset-q' ],
[ '.large-offset-5', '.large-offset-r' ],
[ '.large-offset-4', '.large-offset-8' ],
[ '.large-offset-3', '.large-offset-6' ],
[ '.large-offset-2', '.large-offset-4' ],
[ '.large-offset-1', '.large-offset-2' ],
[ '.large-offset-a', '.large-offset-24' ],
[ '.large-offset-b', '.large-offset-22' ],
[ '.large-offset-z', '.large-offset-20' ],
[ '.large-offset-f', '.large-offset-18' ],
[ '.large-offset-d', '.large-offset-16' ],
[ '.large-offset-e', '.large-offset-14' ],
[ '.large-offset-q', '.large-offset-12' ],
[ '.large-offset-r', '.large-offset-10' ],
  [ '.large-push-12', '.large-push-a' ],
[ '.large-push-11', '.large-push-b' ],
[ '.large-push-10', '.large-push-z' ],
[ '.large-push-9', '.large-push-f' ],
[ '.large-push-8', '.large-push-d' ],
[ '.large-push-7', '.large-push-e' ],
[ '.large-push-6', '.large-push-q' ],
[ '.large-push-5', '.large-push-r' ],
[ '.large-push-4', '.large-push-8' ],
[ '.large-push-3', '.large-push-6' ],
[ '.large-push-2', '.large-push-4' ],
[ '.large-push-1', '.large-push-2' ],
[ '.large-push-a', '.large-push-24' ],
[ '.large-push-b', '.large-push-22' ],
[ '.large-push-z', '.large-push-20' ],
[ '.large-push-f', '.large-push-18' ],
[ '.large-push-d', '.large-push-16' ],
[ '.large-push-e', '.large-push-14' ],
[ '.large-push-q', '.large-push-12' ],
[ '.large-push-r', '.large-push-10' ],
  [ '.large-pull-12', '.large-pull-a' ],
[ '.large-pull-11', '.large-pull-b' ],
[ '.large-pull-10', '.large-pull-z' ],
[ '.large-pull-9', '.large-pull-f' ],
[ '.large-pull-8', '.large-pull-d' ],
[ '.large-pull-7', '.large-pull-e' ],
[ '.large-pull-6', '.large-pull-q' ],
[ '.large-pull-5', '.large-pull-r' ],
[ '.large-pull-4', '.large-pull-8' ],
[ '.large-pull-3', '.large-pull-6' ],
[ '.large-pull-2', '.large-pull-4' ],
[ '.large-pull-1', '.large-pull-2' ],
[ '.large-pull-a', '.large-pull-24' ],
[ '.large-pull-b', '.large-pull-22' ],
[ '.large-pull-z', '.large-pull-20' ],
[ '.large-pull-f', '.large-pull-18' ],
[ '.large-pull-d', '.large-pull-16' ],
[ '.large-pull-e', '.large-pull-14' ],
[ '.large-pull-q', '.large-pull-12' ],
[ '.large-pull-r', '.large-pull-10' ],
  [ '.medium-pull-12', '.medium-pull-a' ],
[ '.medium-pull-11', '.medium-pull-b' ],
[ '.medium-pull-10', '.medium-pull-z' ],
[ '.medium-pull-9', '.medium-pull-f' ],
[ '.medium-pull-8', '.medium-pull-d' ],
[ '.medium-pull-7', '.medium-pull-e' ],
[ '.medium-pull-6', '.medium-pull-q' ],
[ '.medium-pull-5', '.medium-pull-r' ],
[ '.medium-pull-4', '.medium-pull-8' ],
[ '.medium-pull-3', '.medium-pull-6' ],
[ '.medium-pull-2', '.medium-pull-4' ],
[ '.medium-pull-1', '.medium-pull-2' ],
[ '.medium-pull-a', '.medium-pull-24' ],
[ '.medium-pull-b', '.medium-pull-22' ],
[ '.medium-pull-z', '.medium-pull-20' ],
[ '.medium-pull-f', '.medium-pull-18' ],
[ '.medium-pull-d', '.medium-pull-16' ],
[ '.medium-pull-e', '.medium-pull-14' ],
[ '.medium-pull-q', '.medium-pull-12' ],
[ '.medium-pull-r', '.medium-pull-10' ],
  [ '.medium-push-12', '.medium-push-a' ],
[ '.medium-push-11', '.medium-push-b' ],
[ '.medium-push-10', '.medium-push-z' ],
[ '.medium-push-9', '.medium-push-f' ],
[ '.medium-push-8', '.medium-push-d' ],
[ '.medium-push-7', '.medium-push-e' ],
[ '.medium-push-6', '.medium-push-q' ],
[ '.medium-push-5', '.medium-push-r' ],
[ '.medium-push-4', '.medium-push-8' ],
[ '.medium-push-3', '.medium-push-6' ],
[ '.medium-push-2', '.medium-push-4' ],
[ '.medium-push-1', '.medium-push-2' ],
[ '.medium-push-a', '.medium-push-24' ],
[ '.medium-push-b', '.medium-push-22' ],
[ '.medium-push-z', '.medium-push-20' ],
[ '.medium-push-f', '.medium-push-18' ],
[ '.medium-push-d', '.medium-push-16' ],
[ '.medium-push-e', '.medium-push-14' ],
[ '.medium-push-q', '.medium-push-12' ],
[ '.medium-push-r', '.medium-push-10' ],
  [ '.small-push-12', '.small-push-a' ],
[ '.small-push-11', '.small-push-b' ],
[ '.small-push-10', '.small-push-z' ],
[ '.small-push-9', '.small-push-f' ],
[ '.small-push-8', '.small-push-d' ],
[ '.small-push-7', '.small-push-e' ],
[ '.small-push-6', '.small-push-q' ],
[ '.small-push-5', '.small-push-r' ],
[ '.small-push-4', '.small-push-8' ],
[ '.small-push-3', '.small-push-6' ],
[ '.small-push-2', '.small-push-4' ],
[ '.small-push-1', '.small-push-2' ],
[ '.small-push-a', '.small-push-24' ],
[ '.small-push-b', '.small-push-22' ],
[ '.small-push-z', '.small-push-20' ],
[ '.small-push-f', '.small-push-18' ],
[ '.small-push-d', '.small-push-16' ],
[ '.small-push-e', '.small-push-14' ],
[ '.small-push-q', '.small-push-12' ],
[ '.small-push-r', '.small-push-10' ],
  [ '.small-pull-12', '.small-pull-a' ],
[ '.small-pull-11', '.small-pull-b' ],
[ '.small-pull-10', '.small-pull-z' ],
[ '.small-pull-9', '.small-pull-f' ],
[ '.small-pull-8', '.small-pull-d' ],
[ '.small-pull-7', '.small-pull-e' ],
[ '.small-pull-6', '.small-pull-q' ],
[ '.small-pull-5', '.small-pull-r' ],
[ '.small-pull-4', '.small-pull-8' ],
[ '.small-pull-3', '.small-pull-6' ],
[ '.small-pull-2', '.small-pull-4' ],
[ '.small-pull-1', '.small-pull-2' ],
[ '.small-pull-a', '.small-pull-24' ],
[ '.small-pull-b', '.small-pull-22' ],
[ '.small-pull-z', '.small-pull-20' ],
[ '.small-pull-f', '.small-pull-18' ],
[ '.small-pull-d', '.small-pull-16' ],
[ '.small-pull-e', '.small-pull-14' ],
[ '.small-pull-q', '.small-pull-12' ],
[ '.small-pull-r', '.small-pull-10' ],

];
gulp.task('change-to-24', function(){
  gulp.src(way24)
    .pipe(replace(replaceThis))
    .pipe(gulp.dest(wayout));
});
 //end of change from 12 to 24 columns
gulp.task('clean-css', function() {
    return gulp.src(path.dist.css, {read: false}).pipe(rimraf());
});

gulp.task('clean-html', function() {
    return gulp.src(path.dist.html + '*.html', {read: false}).pipe(rimraf());
});

gulp.task('clean-images', function() {
    return gulp.src(path.dist.images, {read: false}).pipe(rimraf());
});

gulp.task('clean-i', function() {
    return gulp.src(path.dist.i, {read: false}).pipe(rimraf());
});

gulp.task('clean-fonts', function() {
    return gulp.src(path.dist.fonts, {read: false}).pipe(rimraf());
});

gulp.task('clean-js', function() {
    return gulp.src(path.dist.js, {read: false}).pipe(rimraf());
});

gulp.task('clean-js-copy', ['js-copy'], function() {
    return gulp.src('dist/components', {read: false}).pipe(rimraf());
});

gulp.task('clean-js-minify', ['js-minify'], function() {
    return gulp.src('dist/components', {read: false}).pipe(rimraf());
});

gulp.task('clean', function() {
    return gulp.src('dist', {read: false}).pipe(rimraf());
});

gulp.task('sass', ['clean-css'], function () {
    return gulp.src(path.src.css)
        .pipe(sass({
                includePaths: sassPaths,
                outputStyle: 'compressed'
            })
            .on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.reload({
         stream: true
        }));
});

gulp.task('pug', ['clean-html', 'sass'], function() {
    return gulp.src(path.src.html)
        .pipe(pug({
            pretty: true,
            cache: true
        }))
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('pug2', ['pug'], function() {
    return browserSync.reload({
         stream: true
        });
});

gulp.task('images', ['clean-images'], function () {
    return gulp.src(path.src.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.images))
        .pipe(browserSync.reload({
         stream: true
        }));
});

gulp.task('i', ['clean-i'], function() {
  gulp.src(path.src.fancy)
      .pipe(gulp.dest(path.dist.images+'/fancy'));

    return gulp.src(path.src.i)
        .pipe(gulp.dest(path.dist.i))
        .pipe(browserSync.reload({
         stream: true
        }));
});

gulp.task('fonts', ['clean-fonts'], function() {
    return gulp.src([path.src.fonts, path.src.awesome])
        .pipe(gulp.dest(path.dist.fonts))
        .pipe(browserSync.reload({
         stream: true
        }));
});

gulp.task('js-html', ['pug'], function () {
    return gulp.src(path.src.jsHtml)
        .pipe(useref({noAssets: true}))
        .pipe(gulp.dest(path.dist.html))
        .pipe(browserSync.reload({
         stream: true
        }));
});

gulp.task('js-copy', ['clean-js'], function () {
    return gulp.src(path.src.js)
        .pipe(useref())
        .pipe(gulp.dest(path.dist.html))
        .pipe(browserSync.reload({
         stream: true
        }));
});

gulp.task('js-minify', ['clean-js', 'pug'], function () {
    return gulp.src(path.src.js)
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest(path.dist.html));
});




gulp.task('minify', ['sass', 'pug', 'images', 'i', 'fonts', 'js-html', 'js-minify', 'clean-js-minify']);

gulp.task('default', ['browserSync','sass', 'pug', 'images', 'i', 'fonts', 'js-html', 'js-copy', 'clean-js-copy'], function () {
    gulp.watch([path.watch.css], ['sass']);
    gulp.watch([path.watch.html], ['pug2']);
    gulp.watch([path.watch.images], ['images']);
    gulp.watch([path.watch.i], ['i']);
    gulp.watch([path.watch.fonts], ['fonts']);
    gulp.watch([path.watch.jsHtml], ['js-html']);
    gulp.watch([path.watch.js], ['js-copy', 'clean-js-copy']);
});
// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  })
});

//https://gist.github.com/Insayt/272c9b81936a03884768
//https://gist.github.com/Deraen/9488df411b61fbe6c831
//https://habrahabr.ru/post/250569/
//https://blog.engineyard.com/2014/frontend-dependencies-management-part-2
//https://gist.github.com/dshafik/07dc3985b5f4888865ea
