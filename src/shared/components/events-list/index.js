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

export default class EventsList extends Component {
  static propTypes = {
    events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    timeline: React.PropTypes.oneOf(['past', 'future'])
  };

  render () {
    const today = new Date();
    return (
      <ul className={styles.eventsList}>
        {
          this.props.events.map((event) => {
            const eventDate = new Date(event.doc.datetime.iso);
            if (this.props.timeline === 'past' ?  eventDate < today : eventDate > today) {
              const eventHref = `${event.doc.datetime.year}/${event.doc.datetime.month}/${event.doc.datetime.date}/${event.doc.slug}`;

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
                      <EventImage imgPath={ imageAssetsEndpoint + event.doc.attributes.featureImageFilename } href={eventHref} />
                    </Cell>
                    <Cell size={11} breakOn="mobile">
                      <HR color="grey" customClassName={styles.wideHorizontalLine} />
                      <Grid fit={false}>
                        <Cell size={8} key='event_description' breakOn="mobileS">
                          <a className={styles.eventTitleLink} href={eventHref}>
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
                          <a href="#" className={styles.fullDetailsLink}>
                              <span>For full details please visit</span>
                              <span className={classNames({
                                [icons.sketchExternalLink]: true,
                                [styles.externalLinkIcon]: true
                              })}
                              />
                          </a>
                        </Cell>
                        <Cell size={4} key='event_picture' breakOn="mobileS" hideOn="mobileS">
                          <EventImage imgPath={ imageAssetsEndpoint + event.doc.attributes.featureImageFilename } href="#" />
                        </Cell>
                      </Grid>
                    </Cell>
                  </Grid>
                </li>
                );
            }})
        }
      </ul>
    );
  }
}
