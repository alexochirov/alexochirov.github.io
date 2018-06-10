var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var wait = require('gulp-wait2');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var pngquant = require('imagemin-pngquant');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var pxtorem = require('postcss-pxtorem');
var postcss = require('gulp-postcss');
var clean = require('gulp-clean');
var rename = require("gulp-rename");

var processors = [
    autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9'],
        remove: false
    }),
    pxtorem({
        propWhiteList: ['font', 'font-size', 'margin-bottom', 'padding-top', 'padding-bottom', 'margin-top', 'margin', 'padding', 'padding-left', 'padding-right'],
        replace: true
    })
];
var path = {

    src: {
        html: 'app/*.html',
        js: 'app/js/*.js',
        style: 'app/css/styles.less',
        stylepapka: 'app/css/',
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

        .pipe(less(
        ).on('error', function (error) {
            done(error);
        }))
        .pipe(rename("/styles_1491838390.css"))
        .pipe(gulp.dest(path.src.stylepapka))
        .pipe(rename("/styles.css"))
        .pipe(gulp.dest(path.src.stylepapka))

        .pipe(wait(1000))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass-2', function (done) {



    return gulp.src(path.src.style)
    .pipe(wait(400))
        .pipe(browserSync.reload({
            stream: true
        }));
});




// Watchers
gulp.task('watch', function () {
    gulp.watch(path.src.stylepapka + '/**/*.less', ['sass','sass-2']);

    gulp.watch(path.src.html, browserSync.reload);
    gulp.watch(path.src.js, browserSync.reload);
    gulp.watch(path.src.img, browserSync.reload);
    gulp.watch(path.src.imgs, browserSync.reload);
    //gulp.watch('app', browserSync.reload); browserSync.reload);
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


gulp.task('sprite', function () {
    var spriteData =
        gulp.src(path.src.spriteimg)
            .pipe(spritesmith({
                imgName: 'sprite-my.png',
                cssName: 'sprite.scss',
                cssFormat: 'scss',
                algorithm: 'diagonal',
                padding: 20,
                //cssTemplate: path.src.spriteTemplate,
                cssVarMap: function (sprite) {
                    sprite.name = 's-' + sprite.name;
                }
            }));

    spriteData.img.pipe(gulp.dest(path.src.images));
    //spriteData.css.pipe(gulp.dest(path.src.stylesPartials));
});


// Build Sequences
// ---------------

gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'], //
        callback
    );
});
