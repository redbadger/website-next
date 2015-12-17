export default function (body) {
return `
<!doctype html>
<html>
  <head>
  <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Red Badger</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="/public/main.css" />
  </head>
  <body>
    <div id="mount">${body}</div>
    <script type="text/javascript" src="/public/main.js"></script>
  </body>
</html>
`;
}
