var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var cssnested =  require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');
var hexrgba = require('postcss-hexrgba');

gulp.task('styles', function(){
    // console.log('Styles being watched');
    return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, cssnested, hexrgba, autoprefixer]))
    .on('error', function(errorInfo){
        console.log(errorInfo.toString()); //this could hamper debugging
        this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});


//Gulp is generating CSS and copying to root app styles.css gulp file from asset/temp/sprite file, and style.js
//is integrating all in style.css

//temp/sprite file can be completely deleleted but I am keeping for understanding purpose