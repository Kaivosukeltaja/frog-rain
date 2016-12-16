import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import filelist from 'gulp-filelist';
import path from 'path';

export default function(gulp, options) {
  // Build an SVG sprite sheet of all icons in directory
  gulp.task('icons:build', () => {
    return gulp.src(`${options.sourcePath}/assets/icons/svg/*.svg`)
      .pipe(svgmin(file => {
        const prefix = path.basename(file.relative, path.extname(file.relative));
        return {
            plugins: [{
                cleanupIDs: {
                    prefix: prefix + '-',
                    minify: true
                }
            }]
        }
      }))
      .pipe(svgstore())
      .pipe(gulp.dest(`${options.sourcePath}/assets/icons`));
  });

  // Create a list of all icons - useful for selecting or listing available
  // icons on the frontend
  gulp.task('icons:list', () => {
    return gulp.src(`${options.sourcePath}/assets/icons/svg/*.svg`)
      .pipe(filelist('icons.json', { flatten: true, removeExtensions: true }))
      .pipe(gulp.dest(`${options.sourcePath}/assets/icons`));
  });

  return () => {
    return gulp.start('icons:build', 'icons:list');
  };
};