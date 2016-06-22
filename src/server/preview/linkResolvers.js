/**
  Link resolvers are used to determine the redirect path for Prismic.io document
  previews. Each link resolver key, e.g. "event", matches the "type" property
  in the document schema and constructs the path using the provided document.
*/
const linkResolvers = {
  event: (doc) => {
    let eventPath = '/';

    try {
      const datePath = doc.data['event.timestamp'].value
        .match(/^(\d{4})-(\d{2})-(\d{2})/)
        .slice(1)
        .join('/');

      eventPath = `/about-us/events/${datePath}/${doc.uid}`;
    } catch (err) {
      console.warn('Unable to create path for event preview.', err);
    }

    return eventPath;
  },
};

export default linkResolvers;
