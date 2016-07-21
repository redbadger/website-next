import React, { PropTypes } from 'react';
import styles from './style.css';
import EventImage from '../event-image';
import DateBubble from '../date-bubble';
import EventMeta from '../event-meta';
import EventTitle from '../event-title';
import HR from '../hr';
import { Grid, Cell } from '../grid';
import { setEndDate, eventImagePath } from '../../util/events';
import { eventHref } from '../../util/event';

const EventsListEntry = ({
  event,
  timeline,
}) => (
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
            <EventMeta
              internalLinks={event.internalLinks}
              externalLinks={event.externalLinks}
              tags={event.tags}
             />
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
);

EventsListEntry.propTypes = {
  event: PropTypes.object.isRequired,
  timeline: PropTypes.oneOf(['past', 'future', 'today']).isRequired,
};

export default EventsListEntry;
