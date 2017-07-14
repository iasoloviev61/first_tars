'use strict';

const gulp = tars.packages.gulp;

const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const fontsFolderPath = `${tars.config.fs.staticFolderName}/fonts`;

/**
 * Move fonts-files to dev directory
 */
module.exports = () => {
    return gulp.task('remove-attr-svg', () => {
        return gulp.src(`./markup/static/img/presvg/*.svg`)
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while moving fonts.', error);
                }
            }))
                        .pipe(cheerio({
                                        run: function ($) {
                                            $('[fill]').removeAttr('fill');
                                            $('[stroke]').removeAttr('stroke');
                                            $('[style]').removeAttr('style');
                                        },
                                        parserOptions: { xmlMode: true }
                                    }))
                        .pipe(replace('&gt;', '>'))
            .pipe(gulp.dest(`./markup/static/img/svg`))
            .pipe(
                notifier.success('compleet')
            );
    });
};
