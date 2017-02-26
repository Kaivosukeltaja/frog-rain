// This file contains all the configuration we need to provide to gulp.
import _ from 'lodash';

export default {
  // Build options
  sourcePath: './src',
  moduleNameToken: '%MODULE_NAME%',
  moduleOutputPath: './magnolia-modules',
  assetOutputPath: './dist',

  uglify: {
    compress: {
      drop_console: true,
    },
  },

  // SASS options
  sass: {
    sourcemap: true,
    style: 'expanded',
  },

  sassGlob: {
  },

  postcss: {
    autoprefixer: {
      browsers: ['last 2 versions', '> 1%', 'ie 9'],
    },
  },

  babel: {
    moduleId: 'ppr',
    sourceRoot: 'ppr',
    getModuleId: (moduleName) => {
      let moduleNameParts = moduleName.split(/\/|\\/);
      const partCount = moduleNameParts.length;

      moduleNameParts = moduleNameParts.filter((part, index) => (
        index !== partCount - 2 // parent directory is always same as module name
      ));

      let realModuleName = moduleNameParts.join('.');

      if (_.endsWith(realModuleName, 'builder')) {
        realModuleName = realModuleName.replace('.builder', '-builder');
      }

      const namespaces = {
        'ppr.components': 'ppr.component',
        'ppr.pages': 'ppr.page',
        'ppr.ui': 'ppr.ui',
        'ppr.module': 'ppr.module',
      };

      _.each(namespaces, (realNamespace, searchNamespace) => {
        if (_.startsWith(realModuleName, searchNamespace)) {
          const customName = _.replace(_.snakeCase(realModuleName.substr(searchNamespace.length + 1)), '_', '-');
          realModuleName = `${realNamespace}.${customName}`;
        }
      });

      return realModuleName;
    },
  },

};
