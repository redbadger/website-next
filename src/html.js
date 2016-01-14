export default function (body, path) {
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
      <script type="text/javascript" src="${path}/index.js"></script>
    </body>
  </html>
  `;
}
