import { splitEvents } from './split-events';
import { expect } from 'chai';
import * as MockDate from 'mockdate';

let testEventsSingleDay = [];
let testEventsMultiDay = [];
let testEventsMultiDayInProgress = [];
let testErrorMultiDay = [];
let currentDate;

describe('SplitEvents', () => {
  beforeEach(() => {
    MockDate.set('Thu Jun 23 2016 14:10:56 GMT+0100 (BST)');

    currentDate = new Date();

    const laterToday = new Date();
    laterToday.setHours(currentDate.getHours() + 1);

    const earlierToday = new Date();
    earlierToday.setHours(currentDate.getHours() - 1);

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);

    const previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 5);

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    testEventsMultiDay = [
      {
        id: 'past-multi-day-event',
        startDateTime: {
          iso: previousDate,
        },
        endDateTime: {
          iso: threeDaysAgo,
        },
      },
      {
        id: 'today-multi-day-event',
        startDateTime: {
          iso: currentDate,
        },
        endDateTime: {
          iso: futureDate,
        },
      },
      {
        id: 'future-multi-day-event',
        startDateTime: {
          iso: tomorrow,
        },
        endDateTime: {
          iso: futureDate,
        },
      },
    ];

    testErrorMultiDay = [
      {
        id: 'today-multi-day-event',
        startDateTime: {
          iso: tomorrow,
        },
        endDateTime: {
          iso: yesterday,
        },
      },
    ];

    testEventsMultiDayInProgress = [
      {
        id: 'past-multi-day-event',
        startDateTime: {
          iso: previousDate,
        },
        endDateTime: {
          iso: threeDaysAgo,
        },
      },
      {
        id: 'yesterday-tomorrow-multi-day-event',
        startDateTime: {
          iso: yesterday,
        },
        endDateTime: {
          iso: futureDate,
        },
      },
    ];

    testEventsSingleDay = [
      {
        id: 'past-event-1',
        startDateTime: {
          iso: previousDate,
        },
        endDateTime: {
          iso: previousDate,
        },
      },
      {
        id: 'past-event-2',
        startDateTime: {
          iso: previousDate,
        },
        endDateTime: {
          iso: previousDate,
        },
      },
      {
        id: 'today-event-1',
        startDateTime: {
          iso: currentDate,
        },
        endDateTime: {
          iso: currentDate,
        },
      },
      {
        id: 'today-event-2',
        startDateTime: {
          iso: currentDate,
        },
        endDateTime: {
          iso: currentDate,
        },
      },
      {
        id: 'later-today-event',
        startDateTime: {
          iso: laterToday,
        },
        endDateTime: {
          iso: laterToday,
        },
      },
      {
        id: 'earlier-today-event',
        startDateTime: {
          iso: earlierToday,
        },
        endDateTime: {
          iso: earlierToday,
        },
      },
      {
        id: 'future-event-1',
        startDateTime: {
          iso: futureDate,
        },
        endDateTime: {
          iso: futureDate,
        },
      },
      {
        id: 'future-event-2',
        startDateTime: {
          iso: futureDate,
        },
        endDateTime: {
          iso: futureDate,
        },
      },
    ];
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe('multi day events', () => {
    it('omits events with end date earlier then start date from final list', () => {
      const timeline = 'today';
      const returnedEvents = splitEvents({
        events: testErrorMultiDay,
        timeline,
        todayDateTime: currentDate,
      });
      expect(returnedEvents.length).to.equal(0);
    });

    it('returns todays events correctly when event start date is today and end date is tomorrow', () => {
      const timeline = 'today';
      const returnedEvents = splitEvents({
        events: testEventsMultiDay,
        timeline,
        todayDateTime: currentDate,
      });
      expect(returnedEvents.length).to.equal(1);
      expect(returnedEvents[0].id).to.equal('today-multi-day-event');
    });

    it('returns todays events correctly when event start date was yesterday and end date is tomorrow', () => {
      const timeline = 'today';
      const returnedEvents = splitEvents({
        events: testEventsMultiDayInProgress,
        timeline,
        todayDateTime: currentDate,
      });
      expect(returnedEvents.length).to.equal(1);
      expect(returnedEvents[0].id).to.equal('yesterday-tomorrow-multi-day-event');
    });

    it('returns future events correctly for upcoming multiday events', () => {
      const timeline = 'future';
      const returnedEvents = splitEvents({
        events: testEventsMultiDay,
        timeline,
        todayDateTime: currentDate,
      });
      expect(returnedEvents.length).to.equal(1);
      expect(returnedEvents[0].id).to.equal('future-multi-day-event');
    });

    it('returns past events correctly for multiday events', () => {
      const timeline = 'past';
      const returnedEvents = splitEvents({
        events: testEventsMultiDay,
        timeline,
        todayDateTime: currentDate,
      });
      expect(returnedEvents.length).to.equal(1);
      expect(returnedEvents[0].id).to.equal('past-multi-day-event');
    });
  });

  describe('single day events', () => {
    it('returns future events', () => {
      const timeline = 'future';
      const returnedEvents = splitEvents({
        events: testEventsSingleDay,
        timeline,
        todayDateTime: currentDate,
      });
      expect(returnedEvents.length).to.equal(2);
      expect(returnedEvents[0].id).to.equal('future-event-1');
      expect(returnedEvents[1].id).to.equal('future-event-2');
    });

    it('returns past events', () => {
      const timeline = 'past';
      const returnedEvents = splitEvents({
        events: testEventsSingleDay,
        timeline,
        todayDateTime: currentDate,
      });
      expect(returnedEvents.length).to.equal(2);
      expect(returnedEvents[0].id).to.equal('past-event-1');
      expect(returnedEvents[1].id).to.equal('past-event-2');
    });

    it('returns todays events', () => {
      const timeline = 'today';
      const returnedEvents = splitEvents({
        events: testEventsSingleDay,
        timeline,
        todayDateTime: currentDate,
      });
      expect(returnedEvents.length).to.equal(4);
      expect(returnedEvents[0].id).to.equal('today-event-1');
      expect(returnedEvents[1].id).to.equal('today-event-2');
      expect(returnedEvents[2].id).to.equal('later-today-event');
      expect(returnedEvents[3].id).to.equal('earlier-today-event');
    });

    it('returns events in reverse order when specified', () => {
      const timeline = 'future';
      const returnedEvents = splitEvents({
        events: testEventsSingleDay,
        timeline,
        todayDateTime: currentDate,
        reverse: true,
      });
      expect(returnedEvents.length).to.equal(2);
      expect(returnedEvents[0].id).to.equal('future-event-2');
      expect(returnedEvents[1].id).to.equal('future-event-1');
    });
  });
});
