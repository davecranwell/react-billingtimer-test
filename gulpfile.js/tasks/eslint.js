var gulp   = require('gulp');
var eslint = require('gulp-eslint');
var config = require('../config').scripts;

// Lint JS/JSX files
gulp.task('eslint', function() {
    return gulp.src(config.src)
        .pipe(eslint({
            baseConfig: {
                "ecmaFeatures": {
                    "jsx": true
                }
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});