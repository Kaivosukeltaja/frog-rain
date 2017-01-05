requirejs.config({
  baseUrl: '/.resources/{%uiModule%}/webresources/js',
  urlArgs: 'c={%cacheBuster%}',

  paths: {
    jquery: 'vendor/common',
    lodash: 'vendor/lodash',
    modernizr: 'vendor/modernizr',
    ppr: 'vendor/common',

    'ppr.page': 'pages',
    'ppr.component': 'components',
    'ppr.module': 'module',
    'ppr.ui': 'ui',
    'ppr.editor': 'ppr_editor',

    // inject
  },

  shim: {
    lodash: {
      exports: '_'
    },

    modernizr: {
      exports: 'Modernizr'
    },

  },
  waitSeconds: 45
});

// Custom error handler
requirejs.onError = err => console.log(err);

require(['modernizr', 'ppr', 'ppr_config', 'jquery'], (Modernizr, PPR, Configuration, $, BalanceText) => {
  PPR.setConfig(Configuration);
  PPR.build();

  // Load editor scripts
  if (Configuration.editorMode === true) {
    require(['ppr.editor'], (Editor) => {
      Editor.build();
    });
  }
});
