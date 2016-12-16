import watch from 'gulp-watch';

export default function(gulp, options) {
  gulp.task('watch:all', ['build:all'], () => {
    // YAML
    watch([`${options.sourcePath}/**/*.yaml`], () => {
      gulp.start('yaml');
    });

    // Assets
    watch([`${options.sourcePath}/assets/**/*`], () => {
      gulp.start('assets');
    });

    // Templates
    watch([`${options.sourcePath}/templates/**/*.ftl`], () => {
      gulp.start('templates');
    });

    // Styles
    watch([
        `${options.sourcePath}/**/*.{sass,scss}`,
        `${options.sourcePath}/*.{sass,scss}`
      ], () => {
      gulp.start('stylesheets');
    });

    // Scripts
    watch([
        `${options.sourcePath}/**/*.js`,
        `${options.sourcePath}/*.js`
      ], () => {
      gulp.start('scripts');
    });

    // Icons
    watch([`${options.sourcePath}/assets/icons/svg/*.svg`], () => {
      gulp.start('icons');
    });

  });

  return () => {
    return gulp.start('watch:all');
  };
};
