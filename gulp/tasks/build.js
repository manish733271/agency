var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var del = require('del');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var browserSync = require('browser-sync').create();

gulp.task('previewDist', function(){
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('deleteDistFolder', ['icons'], function(){
    return del("./docs");
});

gulp.task('copyGeneralFiles',['deleteDistFolder'], function(){
    var pathsToCopy = [
        './app/**/*', 
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages', ['deleteDistFolder'] ,  function(){
    // ! means to exclude some image
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!.app/assets/images/icons/**/*'])
        .pipe(imagemin({
            //jpeg
            progressive: true,
            //gif
            interlance: true,
            //svg
            multipass: true

        }))
        .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function(){
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function(){
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [ rev(), minifyCss() ]
            // js: [ rev(), uglify() ]
        }))
        .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);