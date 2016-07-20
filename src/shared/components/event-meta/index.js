import React, { PropTypes } from 'react';
import styles from './style.css';

import TagsList from '../tags-list';
import EventLinksList from '../event-links-list';

const EventMeta = ({
  event,
}) => {
  console.log('META', event);
  return (
  <div>
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
  </div>
);
};

EventMeta.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventMeta;
