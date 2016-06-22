import { expect } from 'chai';
import linkResolvers from './linkResolvers';

describe('Preview link resolvers', () => {
  it('returns the correct url path for events', () => {
    const resolvedPath = linkResolvers.event({
      uid: 'my-event-title',
      type: 'event',
      data: {
        'event.timestamp': {
          value: '2016-10-22T08:00:00.000Z',
        },
      },
    });
    expect(resolvedPath).to.equal('/about-us/events/2016/10/22/my-event-title');
  });
});
