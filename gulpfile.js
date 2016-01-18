var gulp = require('gulp');
var	postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var	lost = require('lost');
var	autoprefixer = require('autoprefixer');
var	nano = require('gulp-cssnano');
var	rename = require('gulp-rename');
// var	jshint = require('gulp-jshint');
var	concat = require('gulp-concat');
var	uglify = require('gulp-uglify');
var	imagemin = require('gulp-imagemin');
var	browserSync = require('browser-sync');


var path = {
	css: './css/**/*.scss',
	js: './js/**/*.js',
	img: './img/*.+(jpg|png|gif|svg)',
	dest: './build'
};


gulp.task('css', function() {

	var plugins = [
		lost,
		autoprefixer
	];

	return gulp.src(path.css)
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(nano())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest(path.dest));
});


// gulp.task('jshint', function() {

// 	return gulp.src(path.js)
// 		.pipe(jshint())
// 		.pipe(jshint.reporter('default'));
// });


gulp.task('js', function() { // , ['jshint']

	return gulp.src(path.js)
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.dest));
});


gulp.task('img', function() {

	return gulp.src(path.img)
		.pipe(imagemin())
		.pipe(gulp.dest(path.dest + '/img'));
});


gulp.task('browserSync', ['css', 'js', 'img'], function() {
	browserSync({
		server: {
			baseDir: path.dest
		},
	})
});


gulp.task('watch', ['browserSync'], function() {

	gulp.watch(path.css, ['css']);
	gulp.watch(path.js, [ 'js']);
	gulp.watch(path.img, ['img']);
	gulp.watch(path.dest + '/**/*', browserSync.reload);
});


gulp.task('default', ['css', 'js', 'img']);