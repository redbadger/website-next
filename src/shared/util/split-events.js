import dateFns from 'date-fns';

export function splitEvents(events, timeline, { reverse = false } = {}) {
  let relevantEvents = events.filter(event => {
    const d = dateFns.parse(event.startDateTime.iso);
    switch (timeline) {
      case 'today':
        return dateFns.isToday(d);
      case 'past':
        return (dateFns.isPast(d) && !dateFns.isToday(d));
      default:
        return (dateFns.isFuture(d) && !dateFns.isToday(d));
    }
  }, this);

  if (relevantEvents.length > 1 && reverse === true) {
    relevantEvents = relevantEvents.reverse();
  }
  return relevantEvents;
}
