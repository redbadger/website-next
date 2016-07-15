// Display list of events
// You can request only displaying events of past or future
// with the `timeline` prop

/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import styles from './style.css';

import EventImage from '../event-image';
import { imageAssetsEndpoint } from '../../config';
import DateBubble from '../date-bubble';
import HR from '../hr';
import { Grid, Cell } from '../grid';
import classNames from 'classnames';
import icons from '../icons/style.css';

import TagsList from '../tags-list';
import EventLinksList from '../event-links-list';
import { eventHref } from '../../util/event';
import { splitEvents } from '../../util/split-events';

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
      todayDateTime: new Date(),
    })
    : events;

  if (relevantEvents.length > 0) {
    return (
      <div className={styles.eventsListTimelineSection}>
          {(() => {
            switch (timeline) {
              case 'past':
                return (<h2>Past events</h2>);
              case 'future':
                return (<h2>Upcoming events</h2>);
              case 'today':
                return (<h2>Today</h2>);
              default:
                return null;
            }
          })()}
        <ul className={styles.eventsList}>
          {
            relevantEvents.map((event) => (
                <li key={`event_${event.id}`} className={styles.eventItem}>
                  <Grid fit={false}>
                    <Cell size={12}>
                      <HR color="grey" customClassName={styles.mobileHorizontalLine} />
                      <DateBubble
                          startDate={event.startDateTime.date}
                          startMonth={event.startDateTime.monthSym}
                          startYear={event.startDateTime.year}
                          endDate={event.endDateTime.date}
                          endMonth={event.endDateTime.monthSym}
                          endYear={event.endDateTime.year}
                          displayDateRange={(timeline === 'today' && event.startDateTime.date !== event.endDateTime.date)}
                      />
                    </Cell>
                    <Cell size={1} key="event_picture_mobile" hideOn="mobileSM">
                      <EventImage imgPath={ imageAssetsEndpoint + (event.featureImageFilename ? event.featureImageFilename : 'red-badger-event.jpg') } href={eventHref(event)} />
                    </Cell>
                    <Cell size={12} breakOn="mobile">
                      <Grid fit={false}>
                        <Cell size={8} key='event_description' breakOn="mobileS">
                          <a className={styles.eventTitleLink} href={eventHref(event)}>
                            <h2 className={styles.eventTitle}>
                              <span>
                                {event.title}
                              </span>
                              <span className={classNames(
                                {
                                  [styles.arrow]: true,
                                  [icons.sketchArrowRight]: true,
                                })}
                              />
                            </h2>
                          </a>
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
                        <Cell size={4} key='event_picture' breakOn="mobileS" hideOn="mobileS">
                          <EventImage imgPath={ imageAssetsEndpoint + (event.featureImageFilename ? event.featureImageFilename : 'red-badger-event.jpg') } href={eventHref(event)} />
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
  timeline: PropTypes.oneOf(['past', 'future', 'today']),
};

export default EventsList;
