const gulp = require("gulp");
const concat = require('gulp-concat');
const imagemin = require("gulp-imagemin");
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();


function iswork(cb){
    console.log("yup");
    cb();
}


function pics () {
        return gulp.src('./src/img/*')
        .pipe(imagemin())
    
        .pipe(gulp.dest('./dist/img'))
        .pipe(browserSync.stream());
    }

function styles () {
    return gulp.src("./src/scss/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCss({
        level: 2
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());

}

function scripts () {
    return gulp.src('./src/js/**/*.js')
       .pipe(concat('scripts.min.js'))
       .pipe(uglify({
           toplevel: true
       }))
       .pipe(gulp.dest('./dist/js'))
       .pipe(browserSync.stream());
   
   }
   
   function watch() {
       browserSync.init({
           server: {
               baseDir: "./"
           }
       });
   
       gulp.watch('./src/scss/**/*.scss', styles);
       gulp.watch('./src/js/**/*.js', scripts);
       gulp.watch('./*.html', browserSync.reload);
       
   }
   
   
   function clean()  {
      return del(['dist/*']);
   }

exports.iswork = iswork;

exports.pics = pics;

gulp.task('styles', styles);


gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, 
                                     gulp.parallel(styles, pics, scripts)));

gulp.task('dev', gulp.series('build', 'watch'));
