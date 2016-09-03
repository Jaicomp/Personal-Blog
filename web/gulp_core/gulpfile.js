'use strict'

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload');

gulp.task('default',function(){
	livereload.listen();
	gulp.watch('../front/sass/*.sass', ['sass']);
	gulp.watch('../front/html/*.html', ['html']);
	gulp.watch('../front/css/*.css', ['css']);
	gulp.watch('../front/js/*.js', ['js']);

});

gulp.task('sass', function(){
	return gulp.src('../front/sass/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('../front/css'));
});

gulp.task('html', function() {
	gulp.src('../front/html/*.html')
		.pipe(livereload());
});

gulp.task('css', function() {
	gulp.src('../front/css/*.css')
		.pipe(livereload());
});

gulp.task('js', function(){
	gulp.src('../front/js/*.js')
		.pipe(livereload());
});
