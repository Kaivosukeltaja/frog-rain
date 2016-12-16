import gulp from 'gulp';
import sass from 'gulp-sass';
import util from 'gulp-util';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import clean from 'gulp-clean';
import ignore from 'gulp-ignore';
import rename from 'gulp-rename';
import path from 'path';
import sassglob from 'gulp-sass-glob';
import postcss from 'gulp-postcss';

import options from './config';
import scripts from './gulp/scripts';
import icons from './gulp/icons';
import watch from './gulp/watch';

options.isProd = Boolean(util.env.prod);

gulp.task('clean', () => {
  return gulp.src([
      options.moduleOutputPath
    ], { read: false })
    .pipe(clean());
});

gulp.task('assets', () => {
  return gulp.src(`${options.sourcePath}/assets/**/*`)
    .pipe(gulp.dest(`${options.moduleOutputPath}/webresources/assets`));
});

gulp.task('yaml', () => {
  return gulp.src(`${options.sourcePath}/**/*.yaml`)
    .pipe(gulp.dest(`${options.moduleOutputPath}/`));
});

gulp.task('templates', () => {
  return gulp.src(`${options.sourcePath}/templates/**/*.ftl`)
    .pipe(gulp.dest(`${options.moduleOutputPath}/templates`));
});

gulp.task('stylesheets', () => {
  return gulp.src(`${options.sourcePath}/styles.scss`)
    .pipe(sassglob(options.sassGlob.site))
    .pipe(sass(options.sass))
    .pipe(autoprefixer(options.postcss.autoprefixer))
    .pipe(gulp.dest(`${options.moduleOutputPath}/webresources/css`));
});

gulp.task('scripts', scripts(gulp, options));
gulp.task('icons', icons(gulp, options));
gulp.task('watch', watch(gulp, options));

gulp.task('build:all', [
  'assets',
  'templates',
  'yaml',
  'stylesheets',
  'scripts',
  'icons'
]);

gulp.task('default', ['clean'], () => {
  gulp.start('watch');
});