import jsdom from 'jsdom';

let defaultMarkup = '<html><body></body></html>';

if (typeof document === 'undefined') {
  global.document = jsdom.jsdom(defaultMarkup);
  global.window = global.document.defaultView;
  global.navigator = global.window.navigator;
  global.window.innerWidth = 1280;
  global.window.outerWidth = 1280;
}
