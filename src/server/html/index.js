import appleIcon57 from './apple-touch-icon-57x57.png';
import appleIcon60 from './apple-touch-icon-60x60.png';
import appleIcon72 from './apple-touch-icon-72x72.png';
import appleIcon76 from './apple-touch-icon-76x76.png';
import appleIcon114 from './apple-touch-icon-114x114.png';
import appleIcon120 from './apple-touch-icon-120x120.png';
import appleIcon144 from './apple-touch-icon-144x144.png';
import appleIcon152 from './apple-touch-icon-152x152.png';
import appleIcon180 from './apple-touch-icon-180x180.png';
import favIcon16 from './favicon-16x16.png';
import favIcon32 from './favicon-32x32.png';
import favIcon96 from './favicon-96x96.png';
import favIcon192 from './android-chrome-192x192.png';
import favIcon194 from './favicon-194x194.png';
import msIcon from './mstile-144x144.png';

let path = '';

// When using Hot Module Replacement we need to serve the client-side files
// from Webpack Dev Server so that the client can be notified of changes and
// receive them.
if (process.env.HMR === 'true') {
  path = 'http://localhost:8080';
}

export default function (body, initialState, includeJS) {
  const scripts = includeJS
  ? `<script id="initialState" type="application/json">
     ${JSON.stringify(initialState)}
     </script>
     <script type="text/javascript" src="${path}/index.js"></script>`
  : '';

  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Join Us | Red Badger</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" type="text/css" href="${path}/style.css" />
      <link rel="apple-touch-icon" sizes="57x57" href="${appleIcon57}">
      <link rel="apple-touch-icon" sizes="60x60" href="${appleIcon60}">
      <link rel="apple-touch-icon" sizes="72x72" href="${appleIcon72}">
      <link rel="apple-touch-icon" sizes="76x76" href="${appleIcon76}">
      <link rel="apple-touch-icon" sizes="114x114" href="${appleIcon114}">
      <link rel="apple-touch-icon" sizes="120x120" href="${appleIcon120}">
      <link rel="apple-touch-icon" sizes="144x144" href="${appleIcon144}">
      <link rel="apple-touch-icon" sizes="152x152" href="${appleIcon152}">
      <link rel="apple-touch-icon" sizes="180x180" href="${appleIcon180}">
      <link rel="icon" type="image/png" href="${favIcon32}" sizes="32x32">
      <link rel="icon" type="image/png" href="${favIcon194}" sizes="194x194">
      <link rel="icon" type="image/png" href="${favIcon96}" sizes="96x96">
      <link rel="icon" type="image/png" href="${favIcon192}" sizes="192x192">
      <link rel="icon" type="image/png" href="${favIcon16}" sizes="16x16">
      <meta name="msapplication-TileColor" content="#b91d47">
      <meta name="msapplication-TileImage" content="${msIcon}">
    </head>
    <body>
      <div id="mount">${body}</div>
      ${scripts}
    </body>
  </html>
  `;
}
