/**
  Link resolvers are used to determine the redirect path for Prismic.io document
  previews. Each link resolver key, e.g. "event", matches the "type" property
  in the document schema and constructs the path using the provided document.
*/
const asPreview = (resolver) => (
  (doc) => {
    let path = '/';

    try {
      path += `${resolver(doc)}?preview=${doc.id}`;
    } catch (error) {
      console.warn(`Could not create path: ${error.message}`);
    }
    return path;
  }
);

const event = asPreview((doc) => {
  const datePath = doc.data['event.timestamp'].value
    .match(/^(\d{4})-(\d{2})-(\d{2})/)
    .slice(1)
    .join('/');

  return `about-us/events/${datePath}/${doc.uid}`;
});

export default {
  event,
};
