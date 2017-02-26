import $ from 'jquery';

const $html = $('html');
const site = $html.attr('data-site');
const editorMode = typeof $html.attr('data-editor') !== 'undefined';

export default {
  // Set whatever configurable properties you want in here
  language: $html.attr('lang'),
  site,
  domain: 'your-domain-here.com',
  editorMode,
};
