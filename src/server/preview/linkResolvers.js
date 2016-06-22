/**
  Link resolvers are used to determine the redirect path for Prismic.io document
  previews. Each link resolver key, e.g. "event", matches the "type" property
  in the document schema and constructs the path using the provided document.
*/
const linkResolvers = {
  event: (doc) => {
    const date = doc.data['event.timestamp'].value
      .match(/^(\d{4})-(\d{2})-(\d{2})/)
      .slice(1)
      .join('/');

    return `/about-us/events/${date}/${doc.uid}`;
  }
};

export default linkResolvers;
