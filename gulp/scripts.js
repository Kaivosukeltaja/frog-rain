import _ from 'lodash';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import ignore from 'gulp-ignore';
import rename from 'gulp-rename';
import changeCase from 'change-case';
import replace from 'gulp-replace';
import injectString from 'gulp-inject-string';
import babel from 'gulp-babel';
import jscs from 'gulp-jscs';
import tap from 'gulp-tap';
import es from 'event-stream';

export default function(gulp, options) {

  let moduleFiles = [],
    moduleFilePaths = [];

  gulp.task('scripts:getModuleFiles', () => {

    // Get list of module files
    _.each(options.scripts.modules, module => {
      moduleFiles = _.union(moduleFiles, module.files);
    });

    return gulp.src(moduleFiles)
      .pipe(tap(file => moduleFilePaths.push(file.path)));
  });

  gulp.task('scripts:vendor', () => {
    const tasks = [];

    _.each(options.scripts.vendor, (files, name) => {
      tasks.push(
        gulp.src(files)
          .pipe(concat(name + '.js'))
          .pipe(gulpif(options.isProd, uglify(options.uglify)))
          .pipe(gulp.dest(options.moduleOutputPath + '/webresources/js/vendor'))
      );
    });

    return es.concat(tasks);
  });

  // Build normal javascripts
  gulp.task('scripts:modules', ['scripts:getModuleFiles'], () => {
    let tasks = [],
      files = _.union(options.scripts.modules, options.scripts.normal);

    _.each(files, item => {
      tasks.push(
        gulp.src(item.files)
          .pipe(gulpif((typeof item.namespaces === 'undefined'), ignore(file =>
            moduleFilePaths.indexOf(file.path) !== -1
          )))
          .pipe(babel())
          .pipe(gulpif(item.concat === true, concat(item.name + '.js')))
          .pipe(rename(path => {
            path.dirname = '';
            path.basename = changeCase.snakeCase(path.basename);

            return path;
          }))
          .pipe(gulpif(options.isProd, uglify(options.uglify)))
          .pipe(gulp.dest(options.moduleOutputPath + '/webresources/js/' + item.outputPath))
      );
    });

    return es.concat(tasks);
  });

  gulp.task('scripts:main', ['jscs'], () => {
    var tasks = [],
      namespaces = {},
      randomNumber = Math.floor((Math.random() * 100) + 1);

    _.each(options.scripts.modules, module => {
      _.each(module.namespaces, namespace => {
        namespaces[namespace] = {
          name: module.name,
          outputPath: module.outputPath
        };
      });
    });

    let namespaceString = '',
      task;

    _.each(namespaces, (namespace, key) => {
      namespaceString += '\n' + "    '" + key + "': '" + (namespace.outputPath) +"/" + (namespace.name) +"',";
    });

    tasks.push(
      gulp.src('src/base/main.js')
        .pipe(replace('{%uiModule%}', options.moduleName))
        .pipe(replace('{%cacheBuster%}', (new Date()).getTime() + randomNumber))
        .pipe(injectString.after('\/\/ inject', namespaceString))
        .pipe(gulpif(options.isProd, uglify(options.uglify)))
        .pipe(gulp.dest(options.moduleOutputPath + '/webresources/js/'))
    );

    return es.concat(tasks);
  });

  gulp.task('scripts:build', ['scripts:vendor', 'scripts:modules', 'scripts:main']);

  gulp.task('jscs', () => {
    return gulp.src(['src/templates/**/*.js'])
      .pipe(jscs())
      .pipe(jscs.reporter());
  });

  return () => {
    return gulp.start('scripts:build');
  };
};
