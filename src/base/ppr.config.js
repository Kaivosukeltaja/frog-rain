import $ from 'jquery';

const $html = $('html'),
  site = $html.attr('data-site'),
  editorMode = typeof $html.attr('data-editor') !== 'undefined';

export default {
  language: $html.attr('lang'),
  site: site,
  domain: 'your-domain-here.com',
  editorMode: editorMode,

  ui: {
    builders: [
      'ppr.ui/select_builder'
    ]
  },

  // Window util properties
  window: {
    breakpoints: {
      xs:  '< 374',
      s:   '< 768',
      m:   '> 767',
      m2:  '> 940',
      l:   '> 1024',
      l2:  '> 1280',
      xl:  '> 1344',
      xl2: '> 1590'
    },

    mobile_breakpoints: ['xs', 's']
  },

};