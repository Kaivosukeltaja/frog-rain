import es from 'event-stream';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import tap from 'gulp-tap';
import concat from 'gulp-concat';
import order from 'gulp-order';
import _ from 'lodash';
import path from 'path';
import map from 'map-stream';
import replace from 'gulp-replace';
import injectString from 'gulp-inject-string';
import ignore from 'gulp-ignore';
import eslint from 'gulp-eslint';

const filenames = [];
const fileObjects = [];

/**
 * Get compiled filename from precompiled filename
 * @param {string} file filename (precompiled)
 * @return {string} compiled filename
 */
const getFilename = (file) => {
  const targetFile = path.join(__dirname, '../', file);

  // File found without any refactoring to path
  if (typeof filenames[targetFile] !== 'undefined') {
    return filenames[targetFile];
  }

  return file;
};

/**
 * Get files for given bundle
 * @note: this doesn't support globs for now
 * @param {Object} bundle bundle properties
 * @return {string[]} list of file names
 */
const getBundleFiles = (bundle) => {
  let files = _.values(filenames);

  // Convert source filenames to real filenames
  if (bundle.files) {
    const sourceFiles = typeof bundle.files === 'string' ? [bundle.files] : bundle.files;
    files = sourceFiles.map(file => getFilename(file));
  }

  // Filter list of files
  if (bundle.fileFilter) {
    files = files.filter(bundle.fileFilter);
  }

  return files;
};

export default (gulp, options, moduleName) => {
  /**
   * Build individual scripts
   * @param {mixed}  source       target source files
   * @param {Object} buildOptions list of options
   */
  const individualBuild = (source, buildOptions = {}) => {
    const useBabel = buildOptions.useBabel !== false;
    const namespace = buildOptions.namespace || null;
    const includeOnly = buildOptions.includeOnly || null;
    const outputDir = buildOptions.outputDir || null;

    return gulp.src(source)
      .pipe(gulpif(includeOnly !== null, ignore.include(includeOnly)))
      .pipe(map((file, callback) => {
        const targetFile = file;

        targetFile.sourceFileName = targetFile.path;

        if (namespace !== null) {
          const relativeFilename = targetFile.relative.slice(0, -3);

          // Possible values:
          // components/navigation/navigation-login
          // module/login/login
          let namespaceParts = relativeFilename.split(path.sep).reverse();
          const partCount = namespaceParts.length - 1; // 0-index

          namespaceParts = namespaceParts.map((part, index) => {
            // First one is always present
            if (index === 0) {
              return _.snakeCase(part).replace('_', '-');
            }

            // Always skip second and last index
            if (index === 1 || index === partCount) {
              return null;
            }

            return part;
          }).reverse();

          // Remove empty
          namespaceParts = _.filter(namespaceParts);

          targetFile.namespace = `${namespace}.${namespaceParts.join('.')}`;
        }

        return callback(null, targetFile);
      }))
      .pipe(gulpif(useBabel, babel(options.babel)))
      .pipe(gulpif(options.isProd, uglify(options.uglify)))
      .pipe(gulp.dest(`${options.moduleOutputPath}/${moduleName}/webresources/js/${outputDir !== null ? outputDir : ''}`))
      .pipe(tap((file) => {
        filenames[file.sourceFileName] = file.path;
        fileObjects[file.sourceFileName] = file;
      }));
  };

  /**
   * Build bundle
   * @param {Object} bundle bundle properties
   */
  const bundleBuild = bundle => (
    gulp.src(getBundleFiles(bundle))
      .pipe(gulpif(typeof bundle.fileOrder !== 'undefined', order(bundle.fileOrder, { base: `${options.moduleOutputPath}/${moduleName}/webresources/js` })))
      .pipe(concat(`${bundle.name}.js`))
      .pipe(gulp.dest(`${options.moduleOutputPath}/${moduleName}/webresources/js/bundle`))
  );

  /**
   * Get namespace string for main.js -file
   * @return {string} AMD namespace string
   */
  const getAMDNamespaces = () => {
    const targetSource = {};
    const namespaceIndex = [];

    const targetBundles = options.scripts.bundles.filter(bundle => (
      typeof bundle.namespaces !== 'undefined' ? bundle : null
    ));

    // Convert bundles
    targetBundles.map((bundle) => {
      targetSource[`bundle/${bundle.name}`] = bundle.namespaces;
      namespaceIndex.push(...bundle.namespaces);
      return bundle;
    });

    // Convert normal files
    _.each(_.values(fileObjects), (file) => {
      if (typeof file.namespace !== 'undefined') {
        const sourcePath = file.path.split('/webresources/js/').pop().slice(0, -3);

        // Only add file if not already there
        if (_.indexOf(namespaceIndex, file.namespace) === -1) {
          targetSource[sourcePath] = [file.namespace];
          namespaceIndex.push(file.namespace);
        }
      }
    });

    const result = [];

    _.each(targetSource, (targetFiles, sourceFile) => {
      result.push(targetFiles.map(file => (
        `\n    '${file}': '${sourceFile}'`
      )));
    });

    return result.join(',');
  };

  gulp.task(`scripts:pages-${moduleName}`, [], () => (
    individualBuild(`src/modules/${moduleName}/templates/**/*.js`, { namespace: 'ppr.page', includeOnly: 'pages/**/*.js' })
  ));

  gulp.task(`scripts:components-${moduleName}`, [], () => (
    individualBuild(`src/modules/${moduleName}/templates/**/*.js`, { namespace: 'ppr.component', includeOnly: 'components/**/*.js' })
  ));

  gulp.task(`scripts:modules-${moduleName}`, [], () => (
    individualBuild(`src/modules/${moduleName}/base/**/*.js`, { namespace: 'ppr.module', includeOnly: 'module/**/*.js' })
  ));

  gulp.task(`scripts:vendor-${moduleName}`, [], () => (
    individualBuild(options.scripts.vendor, { useBabel: false, outputDir: 'vendor' })
  ));

  gulp.task(`scripts:normal-${moduleName}`, [], () => (
    individualBuild(`src/modules/${moduleName}/base/!(main)*.js`)
  ));

  gulp.task(`scripts:bundle-${moduleName}`, [
    `scripts:components-${moduleName}`,
    `scripts:pages-${moduleName}`,
    `scripts:modules-${moduleName}`,
    `scripts:normal-${moduleName}`,
    `scripts:vendor-${moduleName}`,
  ], () => {
    const targetBundles = options.scripts.bundles || [];

    return es.concat(targetBundles.map(bundle => bundleBuild(bundle)));
  });

  gulp.task(`scripts:main-${moduleName}`, [`scripts:bundle-${moduleName}`], () => {
    const currentTime = (new Date()).getTime();
    const randomNumber = Math.floor((Math.random() * 100) + 1);
    const cacheBuster = currentTime + randomNumber;

    return gulp.src(`src/modules/${moduleName}/base/main.js`)
      .pipe(replace('{%uiModule%}', moduleName))
      .pipe(replace('{%cacheBuster%}', cacheBuster))
      .pipe(injectString.after('// inject', getAMDNamespaces()))
      .pipe(babel())
      .pipe(gulpif(options.isProd, uglify(options.uglify)))
      .pipe(gulp.dest(`${options.moduleOutputPath}/${moduleName}/webresources/js/`));
  });

  gulp.task(`scripts:lint-${moduleName}`, () => (
    gulp.src([`src/modules/${moduleName}/templates/**/*.js`])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(gulpif(options.isProd, eslint.failAfterError()))
  ));

  return () => {
    gulp.start([`scripts:lint-${moduleName}`, `scripts:main-${moduleName}`]);
  };
};
