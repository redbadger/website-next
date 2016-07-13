/* eslint-disable max-len */
export function eventHref(event) {
  return `/about-us/events/${event.startDateTime.year}/${event.startDateTime.month}/${event.startDateTime.date}/${event.slug}`;
}
