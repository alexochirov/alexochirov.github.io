'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    browserSync = require('browser-sync'),
    gulpif = require('gulp-if'),
    ignore = require('gulp-ignore'),
    rimraf = require('gulp-rimraf'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

var sassPaths = [
    './node_modules/foundation-sites/scss',
    './node_modules/motion-ui/src',
    './node_modules/font-awesome/scss/',
    './node_modules/slick-carousel/slick/'
];

var path = {
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        images: 'dist/images/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/jade/*.jade',
        js: 'src/jade/**/_js.html',
        jsHtml: 'dist/*.html',
        css: ['src/scss/style.scss'],//, 'src/scss/style-inline.scss'
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        awesome: 'node_modules/font-awesome/fonts/**/*.*'
    },
    watch: {
        html: ['src/jade/**/*.jade', 'src/jade/**/*.html'],//, 'src/scss/**/*.scss'
        js: ['src/js/**/*.js', 'src/jade/**/_js.html'],
        jsHtml: ['src/jade/**/*.jade', 'src/jade/**/*.html'],//, 'src/scss/**/*.scss'
        css: 'src/scss/**/*.scss',
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        awesome: 'node_modules/font-awesome/fonts/**/*.*'
    }
};

gulp.task('clean-css', function() {
    return gulp.src(path.dist.css, {read: false}).pipe(rimraf());
});

gulp.task('clean-html', function() {
    return gulp.src(path.dist.html + '*.html', {read: false}).pipe(rimraf());
});

gulp.task('clean-images', function() {
    return gulp.src(path.dist.images, {read: false}).pipe(rimraf());
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

gulp.task('jade', ['clean-html', 'sass'], function() {
    return gulp.src(path.src.html)
        .pipe(jade({
            pretty: true,
            cache: true
        }))
        .pipe(gulp.dest(path.dist.html));
});
gulp.task('jade2', ['jade'], function() {
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

gulp.task('fonts', ['clean-fonts'], function() {
    return gulp.src([path.src.fonts, path.src.awesome])
        .pipe(gulp.dest(path.dist.fonts))
        .pipe(browserSync.reload({ 
         stream: true
        }));
});

gulp.task('js-html', ['jade'], function () {
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
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('js-minify', ['clean-js', 'jade'], function () {
    return gulp.src(path.src.js)
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('minify', ['sass', 'jade', 'images', 'fonts', 'js-html', 'js-minify', 'clean-js-minify']);

gulp.task('default', ['browserSync','sass', 'jade', 'images', 'fonts', 'js-html', 'js-copy', 'clean-js-copy'], function () {
    gulp.watch([path.watch.css], ['sass']);
    gulp.watch([path.watch.html], ['jade2']);
    gulp.watch([path.watch.images], ['images']);
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