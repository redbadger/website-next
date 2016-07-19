// Display list of events
// You can request only displaying events of past or future
// with the `timeline` prop

import React, { PropTypes } from 'react';
import styles from './style.css';

import EventImage from '../event-image';
import DateBubble from '../date-bubble';
import HR from '../hr';
import { Grid, Cell } from '../grid';

import TagsList from '../tags-list';
import EventLinksList from '../event-links-list';
import EventsTimelineTitle from '../events-timeline-title';
import EventTitle from '../event-title';
import { eventHref } from '../../util/event';
import { splitEvents, setEndDate, eventImagePath } from '../../util/events';

const EventsList = ({
  events,
  timeline,
}) => {
  const relevantEvents =
    timeline
    ? splitEvents({
      events,
      timeline,
      reverse: timeline === 'future',
    })
    : events;

  if (relevantEvents.length > 0) {
    return (
      <div className={styles.eventsListTimelineSection}>
          <EventsTimelineTitle timeline={timeline} />
        <ul className={styles.eventsList}>
          {
            relevantEvents.map((event) => (
                <li key={`event_${event.id}`} className={styles.eventItem}>
                  <Grid fit={false}>
                    <Cell size={12}>
                      <HR color="grey" customClassName=
                        {styles.mobileHorizontalLine} />
                      <DateBubble
                          startDateTime={event.startDateTime}
                          endDateTime={setEndDate(
                            timeline,
                            event.startDateTime,
                            event.endDateTime)}
                      />
                    </Cell>
                    <Cell size={1} key="event_picture_mobile" hideOn="mobileSM">
                      <EventImage
                        imgPath={eventImagePath(event.featureImageFilename)}
                        href={eventHref(event)} />
                    </Cell>
                    <Cell size={12} breakOn="mobile">
                      <Grid fit={false}>
                        <Cell size={8} key='event_description'
                          breakOn="mobileS">
                          <EventTitle eventTitle={event.title}
                            eventHref={eventHref(event)} />
                          <div className={styles.eventDescription}>
                            {event.strapline}
                          </div>
                          {
                            event.externalLinks || event.internalLinks ?
                              <div className={styles.eventLinks}>
                              {
                                event.externalLinks ?
                                  <EventLinksList
                                    linkList={event.externalLinks}
                                    listType="external" />
                                  : null
                              }
                              {
                                event.internalLinks ?
                                  <EventLinksList
                                    linkList={event.internalLinks}
                                    listType="internal" />
                                  : null
                              }
                              </div>
                            : null
                          }
                          {
                            event.tags
                            ? <TagsList
                                tags={event.tags}
                                tagsLinkPath="about-us/events" />
                            : null
                          }
                        </Cell>
                        <Cell size={4} key='event_picture' breakOn="mobileS"
                          hideOn="mobileS">
                          <EventImage
                            imgPath={eventImagePath(event.featureImageFilename)}
                            href={eventHref(event)} />
                        </Cell>
                      </Grid>
                    </Cell>
                  </Grid>
                </li>
            ))
          }
        </ul>
      </div>
    );
  }

  return null;
};

EventsList.propTypes = {
  events: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  timeline: EventsTimelineTitle.propTypes.timeline,
};

export default EventsList;
