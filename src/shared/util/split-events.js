
export function splitEvents (events, timeline, { reverse = false } = {}) {

  const today = new Date();

  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  yesterday.setHours(23, 59, 59);

  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0);

  let relevantEvents = events.filter(function (event)
  {
    const d = new Date(event.datetime.iso);

    if (timeline === 'today') {
      return (d.toDateString() === today.toDateString());
    } else if (timeline === 'past') {
      return (d < yesterday);
    } else {
      return (d > tomorrow);
    }
  }, this);

  if (relevantEvents.length > 1 && reverse === true) {
    relevantEvents = relevantEvents.reverse();
  }

  return relevantEvents

}
