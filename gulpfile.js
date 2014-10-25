var gulp   = require('gulp');
var tsc    = require('gulp-tsc');
var shell  = require('gulp-shell');
var copy   = require('gulp-copy');
var runseq = require('run-sequence');

var paths = {
	tscripts : { src : ['app/src/**/*.ts'],
				dest : 'app/build' },
    html: { src: ['app/src/**/*.html'],
                dest: 'app/build'}
};

gulp.task('default', ['buildrun']);


// ** Running ** //

gulp.task('run', shell.task([
  'node app/build/index.js'
]));

gulp.task('buildrun', function (cb) {
	runseq('build', 'run', cb);
});

// ** Watching ** //


gulp.task('watch', function () {
	gulp.watch(paths.tscripts.src, ['compile:typescript']);
});

gulp.task('watchrun', function () {
	gulp.watch(paths.tscripts.src, runseq('compile:typescript', 'run'));
});

// ** Compilation ** //

gulp.task('build', ['compile:typescript', 'copy:html']);
gulp.task('compile:typescript', function () {
	return gulp
        .src(paths.tscripts.src)
        .pipe(tsc({
            module: "commonjs",
            emitError: false
        }))
        .pipe(gulp.dest(paths.tscripts.dest));
});
gulp.task('copy:html', function () {
        gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest));
});