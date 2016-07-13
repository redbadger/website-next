/* eslint-disable max-len */
export function eventHref(event) {
  return `/about-us/events/${event.datetime.year}/${event.datetime.month}/${event.datetime.date}/${event.slug}`;
}

export function newsItemHref(news) {
  return `/about-us/news/${news.datetime.year}/${news.datetime.month}/${news.datetime.date}/${news.slug}`;
}
