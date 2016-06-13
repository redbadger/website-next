export function eventHref (event) {
  return `/about-us/events/${event.datetime.year}/${event.datetime.month}/${event.datetime.date}/${event.slug}`;
}
