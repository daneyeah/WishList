'use strict'
//gulp var
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: '*'
    });
//path
var pathFile = require('fs'),
    paths = JSON.parse(pathFile.readFileSync('./paths.json'));
//cleaner
gulp.task('clean', function () {
    return gulp
        .src(paths.public.clean, {read: true})
        .pipe($.clean());
});
gulp.task('less', function () {
   return gulp
       .src([paths.src.less,paths.src.less_i])
       .pipe($.less())
       .pipe(gulp.dest(paths.dist.css))
});
gulp.task('css',function () {
   return gulp
       .src(paths.src.css)
       .pipe($.sourcemaps.init())
       .pipe($.autoprefixer({browsers:['last 2 version']}))
       .pipe($.csscomb())
       .pipe($.csso())
       .pipe($.rename({suffix:'.min'}))
       .pipe(gulp.dest(paths.dist.css_min))
       .pipe($.concat('style.min.css'))
       .pipe($.sourcemaps.write('.'))
       .pipe(gulp.dest(paths.public.css))
});
gulp.task('js',function () {
    $.pump([
        gulp
            .src(paths.src.js),
        $.uglify(),
        $.rename({suffix:'.min'}),
        gulp.dest(paths.public.js)
    ])
});
gulp.task('json',function () {
   return gulp
       .src(paths.src.json)
       .pipe($.jsonEditor({'version': '1.2.3'}))
       .pipe(gulp.dest(paths.public.js))
});
gulp.task('js-lib',function () {
    return gulp
        .src(paths.src.js_lib)
        .pipe(gulp.dest(paths.public.js_lib))
});
gulp.task('pug', function () {
    return gulp
        .src(paths.src.pug)
        .pipe($.pug({'pretty':true}))
        .pipe(gulp.dest(paths.public.primary))
});
gulp.task('build',function () {
   $.runSequence('clean','less','css','json','js','js-lib','pug')
});