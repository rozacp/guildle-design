var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	precss = require('precss'),
	lost = require('lost'),
	autoprefixer = require('autoprefixer'),
	nano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync');


var path = {
	css: 'css/main.css',
	cssw: 'css/**/*.css',
	js: 'js/**/*.js',
	img: 'img/*.+(jpg|png|gif|svg)',
	dest: 'build'
};


gulp.task('css', function() {

	var plugins = [
		precss,
		lost,
		autoprefixer
	];

	return gulp.src(path.css)
		.pipe(postcss(plugins))
		// .pipe(nano())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest(path.dest));
});


gulp.task('jshint', function() {

	return gulp.src(path.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});


gulp.task('js', function() {

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


gulp.task('browserSync', ['css', 'jshint', 'js', 'img'], function() {
	browserSync({
		server: {
			baseDir: path.dest
		},
	})
});


gulp.task('watch', ['browserSync'], function() {

	gulp.watch(path.cssw, ['css']);
	gulp.watch(path.js, ['jshint', 'js']);
	gulp.watch(path.img, ['img']);
	gulp.watch(path.dest + '/**/*', browserSync.reload);
});


gulp.task('default', ['css', 'jshint', 'js', 'img']);