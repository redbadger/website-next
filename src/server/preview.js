import { Prismic } from 'express-prismic';

export default function enableDocumentPreview(app) {
  Prismic.init({
    apiEndPoint: 'https://rb-website.prismic.io/api',
    linkResolver: () => false,
  });

  app.get('/preview', Prismic.preview);
}
