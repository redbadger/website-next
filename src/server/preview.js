import { Prismic } from 'express-prismic';

export default function enableDocumentPreview(app) {
  Prismic.init({
    apiEndpoint: 'https://rb-website.prismic.io/api',

    linkResolver: (doc) => {
      if (doc.type === 'event') {
        const date = doc.data['event.timestamp'].value
          .match(/^(\d{4})-(\d{2})-(\d{2})/)
          .slice(1)
          .join('/');

        return `/about-us/events/${date}/${doc.uid}`;
      }

      return '/';
    },
  });

  app.get('/preview', Prismic.preview);
}
