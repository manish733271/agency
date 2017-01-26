var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var rename = require('gulp-rename');
var del = require('del');

var config = {
    mode: {
        css: {
            // renaming the automatic sprite background image file
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }

        }
    } 
};

//delete the old app/temp/sprite and create new if changes are made
gulp.task('beginClean', function(){
    return del(['./app/temp/sprite/*', './app/assets/images/sprites/*']);
});

// ** means any subfolder inside icons folder and * means any svg file inside that subfolder
gulp.task('createSprite', ['beginClean'], function(){
    return gulp.src('./app/assets/images/icons/**/*')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
});

//copying background image to root app assets/images
gulp.task('copySpriteImage',['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

//copy css to root module from temporary css
gulp.task('copySpriteCSS',['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

//as we are copying everything from temp folder, we don't need this in end
//this is not used in task icons
gulp.task('endClean', ['copySpriteImage', 'copySpriteCSS'], function(){
    return del('./app/temp/sprite');
});

//I will keep this for understanding purpose, but temp file can be deleted compeletely
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteImage', 'copySpriteCSS']);

// gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteImage', 'copySpriteCSS', 'endClean']);