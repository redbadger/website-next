import HR from '../hr';
import { Grid, Cell } from '../grid';
import EventMeta from '../event-meta';
import EventImage from '../event-image';
import DateBubble from '../date-bubble';
import EventTitle from '../event-title';
import React, { PropTypes } from 'react';
import { eventHref } from '../../util/event';
import styles from '../events-list/style.css';
import { setEndDate, eventImagePath } from '../../util/events';

const EventsListEntry = ({
  id,
  tags,
  slug,
  title,
  timeline,
  strapline,
  endDateTime,
  externalLinks,
  internalLinks,
  startDateTime,
  featureImageFilename,
}) => {
  const eventRenderLink = eventHref({
    year: startDateTime.year,
    month: startDateTime.month,
    date: startDateTime.date,
    slug,
  });

  return (
  <li key={`event_${id}`} className={styles.eventItem}>
    <Grid fit={false}>
      <Cell size={12}>
        <HR color="grey" customClassName=
          {styles.mobileHorizontalLine} />
        <DateBubble
            startDateTime={startDateTime}
            endDateTime={setEndDate(
              timeline,
              startDateTime,
              endDateTime)}
        />
      </Cell>
      <Cell size={1} key="event_picture_mobile" hideOn="mobileSM">
        <EventImage
          imgPath={eventImagePath(featureImageFilename)}
          href={eventRenderLink} />
      </Cell>
      <Cell size={12} breakOn="mobile">
        <Grid fit={false}>
          <Cell size={8} key='event_description'
            breakOn="mobileS">
            <EventTitle eventTitle={title}
              eventHref={eventRenderLink} />
            <div className={styles.eventDescription}>
              {strapline}
            </div>
            <EventMeta
              internalLinks={internalLinks}
              externalLinks={externalLinks}
              tags={tags}
             />
          </Cell>
          <Cell size={4} key='event_picture' breakOn="mobileS"
            hideOn="mobileS">
            <EventImage
              imgPath={eventImagePath(featureImageFilename)}
              href={eventRenderLink} />
          </Cell>
        </Grid>
      </Cell>
    </Grid>
  </li>
);
};

EventsListEntry.propTypes = {
  id: PropTypes.string.isRequired,
  strapline: PropTypes.string,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featureImageFilename: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  externalLinks: EventMeta.propTypes.externalLinks,
  internalLinks: EventMeta.propTypes.internalLinks,
  startDateTime: DateBubble.propTypes.startDateTime,
  endDateTime: DateBubble.propTypes.endDateTime,
  timeline: PropTypes.oneOf(['past', 'future', 'today']).isRequired,
};

export default EventsListEntry;
