// Module specific configuration to extend the default ones at root level.

export default function () {
  return {
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

    scripts: {
      // Vendor
      vendor: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/ppr-js/dist/ppr.js',
        'node_modules/requirejs/require.js',
        'node_modules/npm-modernizr/modernizr.js',
        'node_modules/lodash/lodash.min.js',
      ],

      bundles: [

        // This bundle contains common dependencies that can be loaded with single request
        {
          name: 'vendor.common',
          files: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/ppr-js/dist/ppr.js',
          ],
        },
      ],
    },
  };
}
