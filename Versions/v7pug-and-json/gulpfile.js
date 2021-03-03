'use strict';

const del = require('del');
const path = require('path');
const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpPug = require('gulp-pug');
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpBabel = require('gulp-babel');
const gulpConcat = require('gulp-concat');
const gulpUglify = require('gulp-uglify');
const gulpPlumber = require('gulp-plumber');
const gulpNewer = require('gulp-newer');
const gulpArgs = require('yargs').argv;
const gulpSassGlob = require('gulp-sass-glob');
const gulpBrowserSync = require('browser-sync');
const gulpWait = require('gulp-wait2');
const tinypng = require('gulp-tinypng-unlimited');

let nameChosenPage = gulpArgs.pg || '*';

const sassPaths = [
    './node_modules/foundation-sites/scss',
    './node_modules/motion-ui',
    './node_modules/slick-carousel/slick/'
];
const paths = {
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        json: 'dist/json/',
        css: 'dist/css/',
        images: 'dist/images/',
        i: 'dist/i/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/pug/' + nameChosenPage + '.pug',
        js: 'src/js/*.js',
        json: 'src/json/*.json',
        jsLib: [

        ],
        css: ['src/scss/style.scss'],
        images: 'src/images/**/*.*',
        i: 'src/i/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: ['src/pug/**/*.*','src/blocks/**/*.pug'],
        js: ['src/js/**/*.js'],
        json: ['src/json/**/*.json'],
        css:['src/scss/**/*.scss','src/blocks/**/*.scss'],
        images: 'src/images/**/*.*',
        i: 'src/i/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
};


let clean = () => del(paths.dist.html);
let cleanCss = () => del(paths.dist.css);
let cleanHtml = () => del(paths.dist.html + '*.html');
let cleanI = () => del(paths.dist.i);
let cleanFonts = () => del(paths.dist.fonts);
let cleanJs = () => del(paths.dist.js);
let cleanJson = () => del(paths.dist.json);

let sass = () => gulp.src(paths.src.css)
    .pipe(gulpPlumber())
    .pipe(gulpSassGlob())
    .pipe(gulpSass({
        includePaths: sassPaths,
        outputStyle: 'compressed'
    }))
    .pipe(gulpAutoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(paths.dist.css));

let pug = () => gulp.src(paths.src.html)
    .pipe(gulpPlumber())
    .pipe(gulpPug({
        pretty: true,
        cache: true
    }))
    .pipe(gulp.dest(paths.dist.html));

let images = () => gulp.src(paths.src.images, {allowEmpty: true})
    .pipe(gulpNewer(paths.dist.images))
    .pipe(gulp.dest(paths.dist.images))
    .pipe(gulpWait(50))
    .pipe(gulpBrowserSync.reload({
        stream: true
    }));
let imagesMinify = () => gulp.src(paths.src.images, {allowEmpty: true})
    .pipe(gulpNewer(paths.dist.images))
    .pipe(tinypng({

          outputErrorLog: false,
          outputErrorFiles: true,
        }))
    .pipe(gulp.dest(paths.dist.images))
    .pipe(gulpWait(50))
    .pipe(gulpBrowserSync.reload({
        stream: true
    }));


let i = () => gulp.src(paths.src.i, {allowEmpty: true}).pipe(gulp.dest(paths.dist.i));

let iMinify = () => gulp.src(paths.src.i, {allowEmpty: true}).pipe(tinypng({

      outputErrorLog: false,
      outputErrorFiles: true,
    })).pipe(gulp.dest(paths.dist.i));

let fonts = () => gulp.src(paths.src.fonts, {allowEmpty: true}).pipe(gulp.dest(paths.dist.fonts));

let jsLib = () => gulp.src(paths.src.jsLib, {allowEmpty: true})
    .pipe(gulpUglify())
    .pipe(gulpConcat('lib.js'))
    .pipe(gulp.dest(paths.dist.js));

let jsApp = () => gulp.src(paths.src.js, {allowEmpty: true})
    .pipe(gulpBabel({
        presets: ['@babel/env']
    }))
    .pipe(gulpConcat('app.js'))
    .pipe(gulp.dest(paths.dist.js));

let json = () => gulp.src(paths.src.json, {allowEmpty: true})
    .pipe(gulp.dest(paths.dist.json));

let jsAppMinify = () => gulp.src(paths.src.js, {allowEmpty: true})
    .pipe(gulpBabel({
        presets: ['@babel/env']
    }))
    .pipe(gulpUglify())
    .pipe(gulpConcat('app.js'))
    .pipe(gulp.dest(paths.dist.js));

let reloadBrowser = () => gulp.src(paths.src.js, {allowEmpty: true}).pipe(gulpWait(50))
    .pipe(gulpBrowserSync.reload({
        stream: true
    }));

let watch = () => {
    gulp.watch(paths.watch.css, gulp.series(cleanCss, sass, reloadBrowser));
    gulp.watch(paths.watch.html, gulp.series(cleanHtml, pug, reloadBrowser));
    gulp.watch(paths.watch.i, gulp.series(cleanI, i, reloadBrowser));
    gulp.watch(paths.watch.fonts, gulp.series(cleanFonts, fonts, reloadBrowser));
    gulp.watch(paths.watch.js, gulp.series(cleanJs, jsApp, reloadBrowser));
    gulp.watch(paths.watch.json, gulp.series(cleanJson,json, reloadBrowser));

    let imagesWatcher = gulp.watch(paths.watch.images, images);
    imagesWatcher.on('unlink', (unlinkPath) => {
        let filePathFromSrc = path.relative(path.resolve('src/images'), unlinkPath);
        let distFilePath = path.resolve('dist/images', filePathFromSrc);
        del(distFilePath);
        console.log("Delete file: " + distFilePath);
    });
};

let browserSync = () =>
    gulpBrowserSync.init({
        server: {
            baseDir: "dist"
        }
    });

gulp.task('default',
    gulp.series(
        clean,
        gulp.parallel(sass, pug, images, i, fonts, jsApp,json),
        gulp.parallel(watch,browserSync)
    )
);

gulp.task('minify',
    gulp.series(
        clean,
        gulp.parallel(sass, pug, imagesMinify, iMinify, fonts, jsLib, jsAppMinify,json)
    )
);