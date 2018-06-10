var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var pngquant = require('imagemin-pngquant');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var pxtorem = require('postcss-pxtorem');
var postcss = require('gulp-postcss');
var  wait = require('gulp-wait2');

var processors = [
    autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9'],
        remove: false
    })
];
var path = {

    src: {
        html: 'app/*.html',
        js: 'app/js/*.js',
        style: 'app/css/style.scss',
        stylepapka: 'app/css',
        img: 'app/i/*.*',
        spriteTemplate: 'app/css/sass.template.mustache',
        imgs: 'app/images/',
        spriteimg: 'app/images/**/*.*',
        images: 'app/i/',
        fonts: 'app/css/fonts/'
    },

    clean: './build'
};

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('sass', function (done) {
    return gulp.src(path.src.style)
        //.pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', function (error) {
            done(error);
        }))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.src.stylepapka)) // Outputs it in the css folder
        .on('end', function () {
            done();
        })
.pipe(wait(200))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sassmy', function (done) {
    return gulp.src(path.src.style)
        .pipe(sass().on('error', function (error) {
            done(error);
        }))
        .pipe(gulp.dest(path.src.stylepapka)) // Outputs it in the css folder
        .on('end', function () {
            done();
        })

        .pipe(browserSync.reload({
            stream: true
        }));
});


// Watchers
gulp.task('watch', function () {
    gulp.watch(path.src.stylepapka + '/**/*.scss', ['sass']);
    gulp.watch(path.src.html, browserSync.reload);
    gulp.watch(path.src.js, browserSync.reload);
    gulp.watch(path.src.img, browserSync.reload);
    gulp.watch(path.src.imgs, browserSync.reload);
    //gulp.watch('app', browserSync.reload);
});

// Optimization Tasks
// ------------------


// Optimizing Images
gulp.task('img', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant({
                quality: '92',
                speed: 1
            })],
            interlaced: true
        }))
        .pipe(gulp.dest(path.src.images));
});




// Build Sequences
// ---------------

gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'], //
        callback
    );
});
