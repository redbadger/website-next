export default function (body, usingHMR) {
  let appScript = '/index.js';

  // When using Hot Module Replacement we need to serve the client-side JavaScript
  // from Webpack Dev Server so that the client can be notified of changes and
  // receive them.
  if (usingHMR) {
    appScript = 'http://localhost:8081/index.js';
  }

  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Join Us | Red Badger</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" type="text/css" href="/style.css" />
    </head>
    <body>
      <div id="mount">${body}</div>
      <script type="text/javascript" src="${appScript}"></script>
    </body>
  </html>
  `;
}
