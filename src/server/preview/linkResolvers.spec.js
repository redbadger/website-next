import { expect } from 'chai';
import linkResolvers from './linkResolvers';

describe('Preview link resolvers', () => {
  describe('#event(doc)', () => {
    let doc;

    beforeEach(() => {
      doc = {
        uid: 'my-event-title',
        type: 'event',
        data: {
          'event.timestamp': {
            value: '2016-10-22T08:00:00.000Z',
          },
        },
      };
    });

    it('returns the path for the event', () => {
      const resolvedPath = linkResolvers.event(doc);
      expect(resolvedPath).to.equal(`/about-us/events/2016/10/22/${doc.uid}`);
    });

    it('returns the root path if the event date is in an unexpected format', () => {
      doc.data['event.timestamp'] = new Date();
      const resolvedPath = linkResolvers.event(doc);
      expect(resolvedPath).to.equal('/');
    });

    it('returns the root path if the event date is missing', () => {
      delete doc.data['event.timestamp'];
      const resolvedPath = linkResolvers.event(doc);
      expect(resolvedPath).to.equal('/');
    });
  });
});
