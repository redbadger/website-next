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
    </head>
    <body>
      <div id="mount">${body}</div>
      ${scripts}
    </body>
  </html>
  `;
}
