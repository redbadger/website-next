// Display list of events
// You can request only displaying events of past or future
// with the `timeline` prop

import React, { Component } from 'react';
import styles from './style.css';

import EventImage from '../event-image';
import { imageAssetsEndpoint } from '../../config';
import DateBubble from '../date-bubble';
import HR from '../hr';
import { Grid, Cell } from '../grid';
import classNames from 'classnames';
import icons from '../icons/style.css';

import EventExternalLinksList from '../event-external-links-list';

import {eventHref} from '../../util/event';

export default class EventsList extends Component {
  static propTypes = {
    events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    timeline: React.PropTypes.oneOf(['past', 'future', 'today'])
  };

  render () {
    const today = new Date();

    const relevantEvents = this.props.events.filter(function(event) {
      const d = new Date(event.doc.datetime.iso);

      if (this.props.timeline === 'today') {
        return (d.toDateString() === today.toDateString());
      } else if (this.props.timeline === 'past') {
        return (d < today);
      } else {
        return (d > today);
      }
    }, this);

    return (
      <div>
          {(() => {
            if (relevantEvents.length > 0) {
              switch (this.props.timeline) {
                case "past":
                  return (
                    <h2>
                      Past events
                    </h2>
                  );
                case "future":
                  return (
                    <h2>
                    Upcoming events
                    </h2>
                  );
                case "today":
                  return (
                    <h2>
                      Today
                    </h2>
                  );
                default:
                  return null;
              }
            }
          })()}
        <ul className={styles.eventsList}>
          {
            relevantEvents.map((event) => {
              const eventDate = new Date(event.doc.datetime.iso);
              if (this.props.timeline === 'past' ?  eventDate < today : eventDate > today) {

                return (
                  <li key={`event_${event.id}`} className={styles.eventItem}>
                    <Grid fit={false}>
                      <Cell size={1} breakOn="mobile">
                        <HR color="grey" customClassName={styles.mobileHorizontalLine} />
                        <DateBubble
                            date={event.doc.datetime.date}
                            month={event.doc.datetime.monthSym}
                            year={event.doc.datetime.year}
                        />
                      </Cell>
                      <Cell size={1} key="event_picture_mobile" hideOn="mobileSM">
                        <EventImage imgPath={ imageAssetsEndpoint + event.doc.attributes.featureImageFilename } href={eventHref(event)} />
                      </Cell>
                      <Cell size={11} breakOn="mobile">
                        <HR color="grey" customClassName={styles.wideHorizontalLine} />
                        <Grid fit={false}>
                          <Cell size={8} key='event_description' breakOn="mobileS">
                            <a className={styles.eventTitleLink} href={eventHref(event)}>
                              <h2 className={styles.eventTitle}>
                                {event.doc.attributes.title}
                              </h2>
                              <span className={classNames(
                                {
                                  [styles.arrow]: true,
                                  [icons.sketchArrowRight]: true
                                })}
                              />
                            </a>
                            <div className={styles.eventDescription}>
                              {event.doc.attributes.strapline}
                            </div>
                            {
                              event.doc.attributes.externalLinks ?
                                <EventExternalLinksList
                                  linkList={event.doc.attributes.externalLinks} />
                                : null
                            }
                            {
                              event.doc.attributes.internalLinks ?
                                <EventExternalLinksList
                                  linkList={event.doc.attributes.internalLinks} />
                                : null
                            }
                          </Cell>
                          <Cell size={4} key='event_picture' breakOn="mobileS" hideOn="mobileS">
                            <EventImage imgPath={ imageAssetsEndpoint + event.doc.attributes.featureImageFilename } href={eventHref(event)} />
                          </Cell>
                        </Grid>
                      </Cell>
                    </Grid>
                  </li>
                  );
              }})
          }
        </ul>
      </div>
    );
  }
}
