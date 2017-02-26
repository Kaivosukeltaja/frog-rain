import watch from 'gulp-watch';

export default function(gulp, options, module) {
  gulp.task(`watch:all-${module}`, [`build:all-${module}`], () => {
    // YAML (template definitions, dialogs)
    watch([`${options.sourcePath}/modules/${module}/**/*.yaml`], () => {
      gulp.start(`yaml-${module}`);
    });

    // Assets
    watch([`${options.sourcePath}/modules/${module}/assets/**/*`], () => {
      gulp.start(`assets-${module}`);
    });

    // Templates
    watch([`${options.sourcePath}/modules/${module}/templates/**/*.ftl`], () => {
      gulp.start(`templates-${module}`);
    });

    // Styles
    watch([
        `${options.sourcePath}/modules/${module}/**/*.{sass,scss}`,
        `${options.sourcePath}/modules/${module}/*.{sass,scss}`
      ], () => {
      gulp.start(`stylesheets-${module}`);
    });

    // Scripts
    watch([
        `${options.sourcePath}/modules/${module}/**/*.js`,
        `${options.sourcePath}/modules/${module}/*.js`
      ], () => {
      gulp.start(`scripts-${module}`);
    });

  });

  return () => {
    return gulp.start(`watch:all-${module}`);
  };
};
