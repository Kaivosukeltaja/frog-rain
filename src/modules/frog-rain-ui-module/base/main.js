// eslint-disable-next-line
requirejs.config({
  baseUrl: window.magnolia.contextPath + '/.resources/{%uiModule%}/webresources/js',
  urlArgs: 'c={%cacheBuster%}',

  paths: {
    jquery: 'bundle/vendor.common',
    lodash: 'vendor/lodash.min',
    modernizr: 'vendor/modernizr',
    ppr: 'bundle/vendor.common',
    'frograin.config': 'frograin.config',

    // inject
  },

  shim: {
    lodash: {
      exports: '_',
    },

    modernizr: {
      exports: 'Modernizr',
    },

  },
  waitSeconds: 45,
});

// Custom error handler
// eslint-disable-next-line
requirejs.onError = err => console.log(err);

// eslint-disable-next-line
require(['modernizr', 'ppr', 'frograin.config', 'jquery'], (Modernizr, PPR, Configuration, $) => {
  PPR.setConfig(Configuration);
  PPR.build();

  // Load editor scripts
  if (Configuration.editorMode === true) {
    // eslint-disable-next-line
    require(['ppr.editor'], (Editor) => {
      Editor.build();
    });
  }
});
