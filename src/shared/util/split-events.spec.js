import { splitEvents } from './split-events';
import { expect } from 'chai';
import * as MockDate from 'mockdate';

let testevents = [];

describe('SplitEvents', () => {
  beforeEach(() => {
    MockDate.set('Thu Jun 23 2016 14:10:56 GMT+0100 (BST)');

    const currentDate = new Date();

    const laterToday = new Date();
    laterToday.setHours(currentDate.getHours() + 1);

    const earlierToday = new Date();
    earlierToday.setHours(currentDate.getHours() - 1);

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);

    const previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 5);

    const previousEndDate = new Date();
    previousEndDate.setDate(previousEndDate.getDate() - 2);

    testevents = [
      {
        id: 'past-event-1',
        startDateTime: {
          iso: previousDate,
        },
      },
      {
        id: 'past-event-2',
        startDateTime: {
          iso: previousDate,
        },
      },
      {
        id: 'past-multi-day-event',
        startDateTime: {
          iso: previousDate,
        },
        endDateTime: {
          iso: previousEndDate,
        },
      },
      {
        id: 'today-event-1',
        startDateTime: {
          iso: currentDate,
        },
      },
      {
        id: 'today-event-2',
        startDateTime: {
          iso: currentDate,
        },
      },
      {
        id: 'later-today-event',
        startDateTime: {
          iso: laterToday,
        },
      },
      {
        id: 'earlier-today-event',
        startDateTime: {
          iso: earlierToday,
        },
      },
      {
        id: 'future-event-1',
        startDateTime: {
          iso: futureDate,
        },
      },
      {
        id: 'future-event-2',
        startDateTime: {
          iso: futureDate,
        },
      },
      {
        id: 'multi-day-event-1',
        startDateTime: {
          iso: previousDate,
        },
        endDateTime: {
          iso: futureDate,
        },
      },
      {
        id: 'multi-day-event-2',
        startDateTime: {
          iso: previousDate,
        },
        endDateTime: {
          iso: currentDate,
        },
      },
    ];
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('returns future events', () => {
    const timeline = 'future';
    const returnedEvents = splitEvents(testevents, timeline);
    expect(returnedEvents.length).to.equal(2);
    expect(returnedEvents[0].id).to.equal('future-event-1');
    expect(returnedEvents[1].id).to.equal('future-event-2');
  });

  it('returns past events', () => {
    const timeline = 'past';
    const returnedEvents = splitEvents(testevents, timeline);
    expect(returnedEvents.length).to.equal(3);
    expect(returnedEvents[0].id).to.equal('past-event-1');
    expect(returnedEvents[1].id).to.equal('past-event-2');
    expect(returnedEvents[2].id).to.equal('past-multi-day-event');
  });

  it('returns todays events', () => {
    const timeline = 'today';
    const returnedEvents = splitEvents(testevents, timeline);
    expect(returnedEvents.length).to.equal(6);
    expect(returnedEvents[0].id).to.equal('today-event-1');
    expect(returnedEvents[1].id).to.equal('today-event-2');
    expect(returnedEvents[2].id).to.equal('later-today-event');
    expect(returnedEvents[3].id).to.equal('earlier-today-event');
    expect(returnedEvents[4].id).to.equal('multi-day-event-1');
    expect(returnedEvents[5].id).to.equal('multi-day-event-2');
  });

  it('returns events in reverse order when specified', () => {
    const timeline = 'future';
    const returnedEvents = splitEvents(testevents, timeline, { reverse: true });
    expect(returnedEvents.length).to.equal(2);
    expect(returnedEvents[0].id).to.equal('future-event-2');
    expect(returnedEvents[1].id).to.equal('future-event-1');
  });

  describe('given an event spanning multiple days', () => {

  });
});
