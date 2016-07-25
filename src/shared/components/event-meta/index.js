import React, { PropTypes } from 'react';
import styles from './style.css';

import TagsList from '../tags-list';
import EventLinksList from '../event-links-list';

const EventMeta = ({
  internalLinks,
  externalLinks,
  tags,
}) => {
  if (internalLinks.length > 0 && externalLinks.length > 0) {
    return (<div>
      {
        externalLinks || internalLinks ?
          <div className={styles.eventLinks}>
            <EventLinksList
              linkList={externalLinks}
              listType="external" />
            <EventLinksList
              linkList={internalLinks}
              listType="internal" />
          </div>
        : <noscript />
      }
      {
        tags
        ? <TagsList
            tags={tags}
            tagsLinkPath="about-us/events" />
        : <noscript />
      }
      </div>
    );
  }

  return (<noscript />);
};

EventMeta.propTypes = {
  internalLinks: EventLinksList.propTypes.linkList,
  externalLinks: EventLinksList.propTypes.linkList,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default EventMeta;
