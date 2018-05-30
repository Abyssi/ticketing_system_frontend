const gulp = require('gulp');
const minify = require('gulp-minifier');
const concat = require('gulp-concat');

gulp.task('minify-js', function() {
    return gulp.src(['src/**/*.js', '!src/bower_components/**'])
        .pipe(concat('scripts.js'))
        .pipe(minify({minify: true, minifyJS: {sourceMap: true}}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
    return gulp.src(['src/**/*.css', '!src/bower_components/**'])
        .pipe(concat('styles.css'))
        .pipe(minify({minify: true, minifyCSS: true}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-html', function() {
    return gulp.src(['src/**/*.html', '!src/bower_components/**'])
        .pipe(minify({minify: true, minifyHTML: {collapseWhitespace: true, conservativeCollapse: true}}))
        .pipe(gulp.dest('dist'));
});


gulp.task('minify-in-loco', function() {
    return gulp.src(['src/**/*', '!src/bower_components/**']).pipe(minify({
        minify: true,
        minifyHTML: {
            collapseWhitespace: true,
            conservativeCollapse: true,
        },
        minifyJS: {
            sourceMap: true
        },
        minifyCSS: true,
        getKeptComment: function (content, filePath) {
            var m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
    })).pipe(gulp.dest('dist'));
});

gulp.task('minify', function () {
    gulp.run('minify-js');
    gulp.run('minify-css');
    gulp.run('minify-html');
});