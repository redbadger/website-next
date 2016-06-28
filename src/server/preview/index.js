import { Prismic } from 'express-prismic';
import linkResolver from './linkResolvers';

/**
  Document preview is controlled from Prismic.io
  In order for the feature to work there must be an entry in Prismic settings
  to allow it to connect to the website. The Prismic Toolbar script must also
  be included in the page.

  Documentation: https://prismic.io/docs/in-website-preview
*/
const config = {
  apiEndpoint: (
    process.env.NODE_ENV === 'production'
      ? 'https://rb-website.prismic.io/api'
      : 'https://rb-website-stage.prismic.io/api'
  ),
  linkResolver,
};

export default function enableDocumentPreview(app) {
  Prismic.init(config);

  app.get('/preview', (req, res, ctx) => {
    config.linkResolver = linkResolver.bind(null, req.query.token);
    Prismic.preview.call(Prismic, req, res, ctx);
  });

  return app;
}
