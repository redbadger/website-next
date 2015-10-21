/* eslint no-sync: 0 */

import xml2js from 'xml2js';
import fs from 'fs.promised';
import path from 'path';
import sanitizeHtml from 'sanitize-html';

function parseXML(xml) {
  return new Promise((res, rej) => {
    const parser = new xml2js.Parser();
    parser.parseString(xml, (e, result) => {
      if (e) return rej(e);
      return res(result.rss.channel[0]);
    });
  });
}

async function parseWPPostContent(content) { /* eslint-ignore no-unused-vars */
  const gists = content.match(/\[gist id="([^"]+)"[^\]]*\]/g);
  if (gists !== null) {
    gists.forEach((gist) => {
      content = content.replace(gist, 'haha im a gist');
    });
  }
  return sanitizeContent(content);
}

function getWPAuthors(authors) {
  return authors.map(a => ({
    id: a['wp:author_login'][0],
    email: a['wp:author_email'][0],
    displayName: a['wp:author_display_name'][0],
    firstName: a['wp:author_first_name'][0],
    lastName: a['wp:author_last_name'][0],
  }));
}

async function getWPPosts(posts) {
  return await* posts
    .filter(i => i['wp:status'][0] === 'publish')
    .map(async (i) => ({
      title: i.title[0],
      slug: i['wp:post_name'][0],
      url: i.link[0],
      publishedAt: new Date(i.pubDate[0]).toISOString(),
      author: i['dc:creator'][0],
      content: await parseWPPostContent(i['content:encoded'][0]),
      preview: previewMaker(i['content:encoded'][0]),
      tags: i.category
        .filter(c => c.$.domain === 'post_tag')
        .map(c => c._),
    }))
}

async function extractWPContent() {
  const filename = path.resolve(
    __dirname,
    'in/redbadger.wordpress.2015-08-17.xml');
  const dataXML = await fs.readFile(filename);
  const data = await parseXML(dataXML);

  let authors = getWPAuthors(data['wp:author']);
  let posts = await getWPPosts(data.item);

  let to = (f) => path.resolve(__dirname, 'out/' + f);
  let stringify = (json) => JSON.stringify(json, null, 2);

  return await* [
    fs.writeFile(to('authors.json'), stringify(authors)),
    ...posts.map(p => fs.writeFile(to(`posts/${p.slug}.json`), stringify(p))),
  ];
}

function getIndicesOf(searchStr, str) {
  var startIndex = 0;
  var searchStrLen = searchStr.length;
  var index = 0;
  var indices = [];
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}

function previewMaker(content) {
  // Return first two paragraphs of text
  var position = getIndicesOf('</p>', content)[2] + 4;
  return sanitizeContent(content.slice(0, position));
}

function sanitizeContent(content) {
  // Wordpress dump contains inline styles for images
  // in posts which we'd like to get rid of

  // SanitizeHTML is very strict by default, so
  // we're using a bit of custom magic to only
  // affect img tags
  return sanitizeHtml(content, {
    allowedTags: false,
    allowedAttributes: false,
    transformTags: {
      img: (tagName, attribs) => {
        delete attribs['width'];
        delete attribs['height'];
        delete attribs['class'];
        return {
          tagName: 'img',
          attribs: attribs,
        };
      },
    },
  });
}

async function go() {
  try {
    await extractWPContent();
    console.log('done!')
  } catch (e) {
    console.log(e);
  }
}

go();
