import { splitEvents } from './split-events';
import { expect } from 'chai';

let currentDate = new Date()

let futureDate = new Date()
futureDate.setDate(futureDate.getDate() + 5)

let previousDate = new Date()
previousDate.setDate(previousDate.getDate() - 5)

const testevents = [
  {
    id: 'past-event-1',
    datetime: {
      iso: previousDate
    }
  },
  {
    id: 'past-event-2',
    datetime: {
      iso: previousDate
    },
  },
  {
    id: 'today-event-1',
    datetime: {
      iso: currentDate
    },
  },
  {
    id: 'today-event-2',
    datetime: {
      iso: currentDate
    },
  },
  {
    id: 'future-event-1',
    datetime: {
      iso: futureDate
    },
  },
  {
    id: 'future-event-2',
    datetime: {
      iso: futureDate
    },
  }
]

describe('SplitEvents', () => {
  it('returns future events', () => {
    const timeline = "future";
    const returnedEvents = splitEvents(testevents, timeline)
    expect(returnedEvents.length).to.equal(2);
    expect(returnedEvents[0].id).to.equal('future-event-1')
    expect(returnedEvents[1].id).to.equal('future-event-2')
  });

  it('returns past events', () => {
    const timeline = "past";
    const returnedEvents = splitEvents(testevents, timeline)
    expect(returnedEvents.length).to.equal(2);
    expect(returnedEvents[0].id).to.equal('past-event-1')
    expect(returnedEvents[1].id).to.equal('past-event-2')
  });

  it('returns todays events', () => {
    const timeline = "today";
    const returnedEvents = splitEvents(testevents, timeline)
    expect(returnedEvents.length).to.equal(2);
    expect(returnedEvents[0].id).to.equal('today-event-1')
    expect(returnedEvents[1].id).to.equal('today-event-2')
  });

  it('returns events in reverse order when specified', () => {
    const timeline = "future";
    const returnedEvents = splitEvents(testevents, timeline, {reverse: true})
    expect(returnedEvents.length).to.equal(2);
    expect(returnedEvents[0].id).to.equal('future-event-2')
    expect(returnedEvents[1].id).to.equal('future-event-1')
  });
});
