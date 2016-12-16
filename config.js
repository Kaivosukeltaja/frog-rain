// This file contains all the configuration we need to provide to gulp.

// Change this if/when you want to change the name of your module
const MODULE_NAME = 'frog-rain-ui-module';

export default {
  // Build options
  sourcePath: './src',
  moduleName: MODULE_NAME,
  moduleOutputPath: `./magnolia-modules/${MODULE_NAME}`,
  assetOutputPath: './dist',

  uglify: {
    compress: {
      drop_console: true
    }
  },

  // SASS options
  sass: {
    sourcemap: true,
    style: 'expanded'
  },

  sassGlob: {
  },

  postcss: {
    autoprefixer: {
      browsers: ['last 2 versions', '> 1%', 'ie 9']
    }
  },

  scripts: {
    // Vendor
    vendor: {
      common: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/ppr-js/dist/ppr.js',
      ],
      require: 'node_modules/requirejs/require.js',
      modernizr: 'node_modules/npm-modernizr/modernizr.js',
      lodash: 'node_modules/lodash/lodash.min.js'
    },

    // Custom modules
    modules: [
        {
          name: 'builders',
          files: ['src/base/ui/**/*.builder.js'],
          namespaces: [
            'ppr.ui/link_builder',
            'ppr.ui/select_builder',
            'ppr.ui/tooltip_builder',
            'ppr.ui/popover_builder',
            'ppr.ui/string_builder',
            'ppr.ui/modal_builder'
          ],
          concat: true,
          outputPath: 'ui'
        }
    ],

    // Normal
    normal: [
      { name: 'pprConfig', files: ['src/base/ppr.config.js'], outputPath: '' },
      { name: 'ppr_editor', files: ['src/base/ppr.editor.js'], outputPath: '' },
      { name: 'ui', files: ['src/base/ui/**/!(*builder).js'], outputPath: 'ui' },
      { name: 'pages', files: ['src/templates/pages/**/*.js'], outputPath: 'pages' },
      { name: 'components', files: ['src/templates/components/**/*.js'], outputPath: 'components' }
    ]
  }
};

