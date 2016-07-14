import dateFns from 'date-fns';

export function splitEvents({
  events,              // array of events
  timeline,            // one of 'past', 'today', 'future'
  reverse = false,     // optionally reverse final list of events
  todayDateTime = null,  // iso string representing today date
}) {
  const today = todayDateTime || new Date();

  let relevantEvents = events.filter(event => {
    const startDateTime = dateFns.parse(event.startDateTime.iso);
    const endDateTime = dateFns.parse(event.endDateTime.iso);

    // In a rare case of user error we omit this event from the output list
    if (!dateFns.isSameDay(startDateTime, endDateTime) &&
      !dateFns.isBefore(startDateTime, endDateTime)) {
      return false;
    }

    switch (timeline) {
      case 'today':
        if (dateFns.isSameDay(startDateTime, endDateTime)) {
          return dateFns.isSameDay(startDateTime, today);
        } else { // eslint-disable-line no-else-return
          return dateFns.isWithinRange(today, startDateTime, endDateTime);
        }
      case 'past':
        return (!dateFns.isWithinRange(today, startDateTime, endDateTime) && dateFns.isBefore(endDateTime, today) && !dateFns.isSameDay(endDateTime, today));
      case 'future':
        return (!dateFns.isSameDay(startDateTime, today) &&
          dateFns.isAfter(startDateTime, today));
      default:
        return false;
    }
  }, this);

  if (relevantEvents.length > 1 && reverse === true) {
    relevantEvents = relevantEvents.reverse();
  }

  return relevantEvents;
}
