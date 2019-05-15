const gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    rename = require("gulp-rename"),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require("gulp-sass");

// const cssFiles = [
//     './node_modules/normalize.css/normalize.css',
//     './src/css/style.css',
//     './src/css/some.css',
// ];

const sassFiles = [
    './node_modules/normalize.css/normalize.css',
    './src/scss/style.scss'
];

const jsFiles = [
    './src/js/script.js'
];

const imgFiles = [
    './src/img/**/*.{jpg,jpeg,png,svg}'
];

function images() {
    return gulp.src(imgFiles)
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.stream())
}

// function style() {
//     return gulp.src(cssFiles)
//         .pipe(sourcemaps.init())
//         .pipe(concat('style.css'))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(autoprefixer({
//             browsers: ['>0.1%'],
//             cascade: false
//         }))
//         .pipe(cleanCSS({
//             level: 2
//         }))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('./build/css'))
//         .pipe(browserSync.stream())
// }

function sassToCSS() {
    return gulp.src(sassFiles)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['>0.1%'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/css/'))
        .pipe(browserSync.stream());
}

function script() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        // tunnel: true,
        host: 'localhost',
        port: 9000,
        logPrefix: "alex.kishkun"
    });
    // gulp.watch('./src/css/**/*.css', style);
    gulp.watch('.src/img/**/*.{jpg,jpeg,png,svg}', images);
    gulp.watch('./src/scss/**/*.scss', sassToCSS);
    gulp.watch('./src/js/**/*.js', script);
    gulp.watch('./**/*.html', browserSync.reload);
}

function clean() {
    return del(['build/*'])
}

gulp.task('images', images);
gulp.task('sass', sassToCSS);
// gulp.task('style', style);
gulp.task('script', script);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean,
    gulp.parallel(images, sassToCSS, script)  //sassToCSS
));
gulp.task('dev', gulp.series('build', 'watch'));