/* eslint-disable max-len */
export function eventHref(event) {
  return `/about-us/events/${event.doc.datetime.year}/${event.doc.datetime.month}/${event.doc.datetime.date}/${event.doc.slug}`;
}
