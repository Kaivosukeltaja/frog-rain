import gulp from 'gulp';
import sass from 'gulp-sass';
import util from 'gulp-util';
import autoprefixer from 'gulp-autoprefixer';
import clean from 'gulp-clean';
import fs from 'fs';
import path from 'path';
import sassglob from 'gulp-sass-glob';
import plumber from 'gulp-plumber';
import replace from 'gulp-replace';

import options from './config';
import scripts from './gulp/scripts';
import watch from './gulp/watch';

options.isProd = Boolean(util.env.prod);

function createCleanTask(moduleName) {
  gulp.task(`clean-${moduleName}`, () =>
    gulp.src([
      `${options.moduleOutputPath}/${moduleName}`,
    ], { read: false })
    .pipe(clean()),
  );
}

function createAssetsTask(moduleName) {
  gulp.task(`assets-${moduleName}`, () =>
    gulp.src(`${options.sourcePath}/modules/${moduleName}/assets/**/*`)
      .pipe(gulp.dest(`${options.moduleOutputPath}/${moduleName}/webresources/assets`)),
  );
}

function createYamlTask(moduleName) {
  gulp.task(`yaml-${moduleName}`, () =>
    gulp.src(`${options.sourcePath}/modules/${moduleName}/**/*.yaml`)
      .pipe(replace('%MODULE_NAME%', moduleName))
      .pipe(gulp.dest(`${options.moduleOutputPath}/${moduleName}/`)),
  );
}

function createTemplatesTask(moduleName) {
  gulp.task(`templates-${moduleName}`, () =>
    gulp.src(`${options.sourcePath}/modules/${moduleName}/templates/**/*.ftl`)
      .pipe(replace('%MODULE_NAME%', moduleName))
      .pipe(gulp.dest(`${options.moduleOutputPath}/${moduleName}/templates`)),
  );
}

function createStylesheetsTask(moduleName) {
  gulp.task(`stylesheets-${moduleName}`, () =>
    gulp.src(`${options.sourcePath}/modules/${moduleName}/styles.scss`)
      .pipe(plumber())
      .pipe(replace('%MODULE_NAME%', moduleName))
      .pipe(sassglob(options.sassGlob.site))
      .pipe(sass(options.sass))
      .pipe(autoprefixer(options.postcss.autoprefixer))
      .pipe(gulp.dest(`${options.moduleOutputPath}/${moduleName}/webresources/css`)),
  );
}

function createBuildAllTask(moduleName) {
  gulp.task(`build:all-${moduleName}`, [
    `assets-${moduleName}`,
    `templates-${moduleName}`,
    `yaml-${moduleName}`,
    `stylesheets-${moduleName}`,
    `scripts-${moduleName}`,
  ]);
}

gulp.task('clean', () =>
  gulp.src([
    options.moduleOutputPath,
  ], { read: false })
  .pipe(clean()),
);

gulp.task('modules', () => {
  const modules = fs.readdirSync(`${options.sourcePath}/modules`)
    .filter(file => fs.statSync(path.join(`${options.sourcePath}/modules`, file)).isDirectory());

  modules.forEach((module) => {
    const moduleConfigFile = `${options.sourcePath}/modules/${module}/config.js`;
    let moduleOptions = {};

    if (fs.existsSync(moduleConfigFile)) {
      // eslint-disable-next-line
      moduleOptions = require(moduleConfigFile)();
    }

    const extendedOptions = Object.assign({}, options, moduleOptions);

    createAssetsTask(module);
    createYamlTask(module);
    createStylesheetsTask(module);
    createTemplatesTask(module);
    createCleanTask(module);
    createBuildAllTask(module);
    gulp.task(`scripts-${module}`, scripts(gulp, extendedOptions, module));
    gulp.task(`watch-${module}`, watch(gulp, extendedOptions, module));
    gulp.start(`watch-${module}`);
  });
});

gulp.task('default', ['clean'], () => {
  gulp.start('modules');
});
