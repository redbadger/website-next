// Display list of events
// You can request only displaying events of past or future
// with the `timeline` prop

/* eslint-disable max-len */

import React, { Component } from 'react';
import styles from './style.css';

import EventImage from '../event-image';
import { imageAssetsEndpoint } from '../../config';
import DateBubble from '../date-bubble';
import HR from '../hr';
import { Grid, Cell } from '../grid';
import classNames from 'classnames';
import icons from '../icons/style.css';

import EventLinksList from '../event-links-list';

import { eventHref } from '../../util/event';

export default class EventsList extends Component {
  static propTypes = {
    events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    timeline: React.PropTypes.oneOf(['past', 'future', 'today']),
  };

  render() {
    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(23, 59, 59);

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0);

    let relevantEvents = this.props.events.filter((event) => {
      const date = new Date(event.datetime.iso);

      switch (this.props.timeline) {
        case 'today':
          return (date.toDateString() === today.toDateString());
        case 'past':
          return (date < yesterday);
        default:
          return (date > tomorrow);
      }
    });

    if (relevantEvents.length > 1 && this.props.timeline === 'future') {
      relevantEvents = relevantEvents.reverse();
    }

    if (relevantEvents.length > 0) {
      return (
        <div className={styles.eventsListTimelineSection}>
            {(() => {
              switch (this.props.timeline) {
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
                      <Cell size={1} breakOn="mobile">
                        <HR color="grey" customClassName={styles.mobileHorizontalLine} />
                        <DateBubble
                            date={event.datetime.date}
                            month={event.datetime.monthSym}
                            year={event.datetime.year}
                        />
                      </Cell>
                      <Cell size={1} key="event_picture_mobile" hideOn="mobileSM">
                        <EventImage imgPath={ imageAssetsEndpoint + (event.featureImageFilename ? event.featureImageFilename : 'red-badger-event.jpg') } href={eventHref(event)} />
                      </Cell>
                      <Cell size={11} breakOn="mobile">
                        <HR color="grey" customClassName={styles.wideHorizontalLine} />
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
  }
}
