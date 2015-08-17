/* eslint no-sync: 0 */

import xml2js from 'xml2js';
import fs from 'fs';
import path from 'path';

const filename = path.resolve(
  __dirname,
  'in/redbadger.wordpress.2015-08-17.xml');
const data = fs.readFileSync(filename);
const parser = new xml2js.Parser();
parser.parseString(data, (e, result) => {
  const root = result.rss.channel[0];
  fs.writeFileSync(path.resolve(__dirname, 'out/authors.json'),
    JSON.stringify(root['wp:author'].map(a => ({
      login: a['wp:author_login'][0],
      email: a['wp:author_email'][0],
      displayName: a['wp:author_display_name'][0],
      firstName: a['wp:author_first_name'][0],
      lastName: a['wp:author_last_name'][0]
    })), null, 2));
  root.item
    .filter(i => i['wp:status'][0] === 'publish')
    .map(i => ({
      title: i.title[0],
      slug: i['wp:post_name'][0],
      url: i.link[0],
      publishedAt: new Date(i.pubDate[0]).toISOString(),
      author: i['dc:creator'][0],
      content: i['content:encoded'][0],
      tags: i.category
        .filter(c => c.$.domain === 'post_tag')
        .map(c => c._)
    }))
    .forEach(i => fs.writeFileSync(
      path.resolve(__dirname, `out/posts/${i.slug}.json`),
      JSON.stringify(i, null, 2)));
});
