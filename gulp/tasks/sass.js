var gulp         = require('gulp');
var sass         = require('gulp-sass');
var config         = require('../config');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var inline_base64 = require('gulp-inline-base64');
var sassGlob        = require('gulp-sass-glob');
var processors = [
    autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    })
];
gulp.task('sass', function() {
    return gulp
        .src(config.src.sass + '/*.sass')
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
            precision: 5
        }))
        .pipe(inline_base64({
            baseDir: config.src.sass + '/',
            maxSize: 1
        }))
        .pipe(postcss(processors))
        .pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:watch', function() {
    gulp.watch(config.src.sass + '/**/*.{sass,scss}', ['sass']);
});