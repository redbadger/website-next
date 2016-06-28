import { Prismic } from 'express-prismic';
import linkResolvers from './linkResolvers';

/**
  Document preview is controlled from Prismic.io
  In order for the feature to work there must be an entry in Prismic settings
  to allow it to connect to the website. The Prismic Toolbar script must also
  be included in the page.

  Documentation: https://prismic.io/docs/in-website-preview
*/
export default function enableDocumentPreview(app) {
  Prismic.init({
    apiEndpoint: 'https://rb-website.prismic.io/api',

    linkResolver: (doc) => {
      if (typeof linkResolvers[doc.type] === 'function') {
        return linkResolvers[doc.type](doc);
      }
      return '/';
    },
  });

  app.get('/preview', Prismic.preview);

  return app;
}
