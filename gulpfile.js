var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var preset =  require('babel-preset-es2015');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');



gulp.task('styles', function () {
	gulp
		.src('index.scss')
		.pipe(sass())
		.pipe(rename('app.css'))
		.pipe(gulp.dest('public'));
});


gulp.task('assets', function () {
	gulp
		.src('assets/*')
		.pipe(gulp.dest('public'));
})




function compile(watch) {
	var bundle = watchify(browserify('./src/index.js'));

	function reBundle() {
		bundle
			.transform(babel, preset)
			.bundle()
			.on('error', (err)=>{ console.log(err);})
			.pipe(source('index.js'))
			.pipe(rename('app.js'))
			.pipe(gulp.dest('public'));
	}

	if (watch){
		bundle.on('update', ()=>{
			console.log('--> Bundling');
			reBundle();
		})
	}

	reBundle();
}

gulp.task('build', ()=> compile())

gulp.task('watch', ()=> compile(true))

gulp.task('default',['styles','assets', 'build'])