// ░██████╗░██╗░░░██╗██╗░░░░░██████╗░  ███████╗██╗██╗░░░░░███████╗
// ██╔════╝░██║░░░██║██║░░░░░██╔══██╗  ██╔════╝██║██║░░░░░██╔════╝
// ██║░░██╗░██║░░░██║██║░░░░░██████╔╝  █████╗░░██║██║░░░░░█████╗░░
// ██║░░╚██╗██║░░░██║██║░░░░░██╔═══╝░  ██╔══╝░░██║██║░░░░░██╔══╝░░
// ╚██████╔╝╚██████╔╝███████╗██║░░░░░  ██║░░░░░██║███████╗███████╗
// ░╚═════╝░░╚═════╝░╚══════╝╚═╝░░░░░  ╚═╝░░░░░╚═╝╚══════╝╚══════╝


//   🚀 👨‍🚀 🚀  //
// ARCHITECTURE //
my = {
    dev: {
        root: "dev",
        css: "dev/sass",
        img: "dev/img",
        js: "dev/js"
    },
    prod: {
        root: "prod",
        css: "prod/css",
        img: "prod/img",
        js: "prod/js"
    }
}

// 🚀 👨‍🚀 🚀 //
// VARIABLES //
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
// var pipeline = require('readable-stream').pipeline;
var browserSync = require('browser-sync').create();

// 🚀 👨‍🚀 🚀 //
//   TASKS   //
gulp.task('make-sass', function() {
    return gulp.src(`${my.dev.css}/*.scss`)
        // add sourcemap file
        .pipe(sourcemaps.init())
        // compress scss
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        // cross-browser prefixes (-webkit-, -moz-, etc.) 
        .pipe(autoprefixer())
        // rename to .min.css
        .pipe(rename(function (path) {
            path.basename += ".min";
            
        }))
        // write map and css in prod/css
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${my.prod.css}`));
});

gulp.task('move-html', function() {
    return gulp.src(`${my.dev.root}/*.html`)
        .pipe(gulp.dest(`${my.prod.root}`));
});

gulp.task('move-img', function() {
    return gulp.src(`${my.dev.img}/**/*`)
        .pipe(gulp.dest(`${my.prod.img}`));
});

// uglify sans pipeline
gulp.task('move-js', function() {
    
    return gulp.src(`${my.dev.js}/*.js`)
    .pipe(uglify()) 
    .pipe(rename(function (path) {
        path.basename += ".min";
      }))
    .pipe(gulp.dest(`${my.prod.js}`));
});

// uglify avec pipeline (MARCHPAS) !
// gulp.task('move-js', function() {
//     return pipeline(
//         gulp.src(`${my.dev.js}/*.js`),
//         rename( function (path) {
//             path.basename += ".min";
//         }),
//         uglify(),
//         gulp.dest(`${my.prod.js}`)
//     )
// });

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: `${my.prod.root}/`
        }
    });
});

// 🚀 👨‍🚀 🚀 //
// EXECUTION //
gulp.task('observation', gulp.parallel(
    'make-sass',
    'move-html',
    'move-js',
    'move-img',
    'browser-sync',
    function(){
    gulp.watch(`${my.dev.css}/**/*.scss`, gulp.series('make-sass'));
    gulp.watch(`${my.dev.root}/*.html`).on('change', gulp.series('move-html'));
    gulp.watch(`${my.dev.js}/*.js`).on('change', gulp.series('move-js'));
    gulp.watch(`${my.prod.root}/*.html`).on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('observation'));