import dateFns from 'date-fns';

export function splitEvents(events, timeline, { reverse = false } = {}) {
  let relevantEvents = events.filter(event => {
    const startDate = dateFns.parse(event.startDateTime.iso);
    const endDate = event.endDateTime && dateFns.parse(event.endDateTime.iso);

    const isActiveMultiDayEvent = (
      endDate !== null
      ? dateFns.isWithinRange(new Date(), startDate, endDate)
      : false
    );

    switch (timeline) {
      case 'today':
        return dateFns.isToday(startDate) || isActiveMultiDayEvent;
      case 'past':
        return !isActiveMultiDayEvent &&
          (dateFns.isPast(startDate) && !dateFns.isToday(startDate));
      default:
        return (dateFns.isFuture(startDate) && !dateFns.isToday(startDate));
    }
  }, this);

  if (relevantEvents.length > 1 && reverse === true) {
    relevantEvents = relevantEvents.reverse();
  }
  return relevantEvents;
}
