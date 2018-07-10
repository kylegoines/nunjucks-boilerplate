///////////////////////////////////////////////////////////////
// requires
///////////////////////////////////////////////////////////////
const gulp = require( "gulp" )
const parcel = require( 'gulp-parcel' )
const sass = require( 'gulp-sass' )
const autoprefixer = require( 'gulp-autoprefixer' )
const ext_replace = require( 'gulp-ext-replace' )
const nunjucks = require( 'gulp-nunjucks' )
const nunjucksRender = require( 'gulp-nunjucks-render' )
const clean = require( 'gulp-clean' )
const gulpSequence = require( 'gulp-sequence' )

///////////////////////////////////////////////////////////////
gulp.task( 'sass', () => {
	gulp.src(  './_scss/**/*.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( gulp.dest( './public/build/' ) )
		.pipe(autoprefixer() )
		.pipe( gulp.dest( './public/build/' ) )
})
///////////////////////////////////////////////////////////////
gulp.task( 'default', () => {
	console.log('dont forget to run `npm run serve` to run the server');
	gulp.watch(  './_js/**/*.js', ['bundle'] )
	gulp.watch( './_scss/**/*.scss', ['sass'] )
})

///////////////////////////////////////////////////////////////
gulp.task( 'bundle', () => {
    gulp.src( '_js/index.js', { read: false } )
		.pipe( parcel( { outDir: 'public/build', publicURL: './', minify: true } ) )
		.pipe( gulp.dest( 'public/build' ) )
})

///////////////////////////////////////////////////////////////
gulp.task( 'flattenTemplates', () => {
	return gulp.src( 'site/templates/*.html' )
		.pipe( nunjucksRender( {
			path: ['site'],
			watch: false
		}))
		.pipe( gulp.dest( 'dist' ) );
});

///////////////////////////////////////////////////////////////
gulp.task( 'clean', () => {
	return gulp.src( ['dist/*'], { read: false } )
		.pipe( clean() );
})

///////////////////////////////////////////////////////////////
const filesToMove = [
    './public/**/*.*',
];

gulp.task( 'moveFiles', () => {
	return gulp.src( filesToMove, { base: './' } )
  		.pipe( gulp.dest( 'dist' ) );
})
///////////////////////////////////////////////////////////////

gulp.task( 'build', gulpSequence( 'clean', 'moveFiles', 'flattenTemplates' ) )
