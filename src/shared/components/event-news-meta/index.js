import React, { PropTypes } from 'react';
import styles from '../events-list/style.css';

import TagsList from '../tags-list';
import EventLinksList from '../event-links-list';

const EventNewsMeta = ({
  internalLinks,
  externalLinks,
  tags,
}) => {
  let linksSection = (<noscript />);
  let tagsSection = (<noscript />);

  if (internalLinks.length > 0 && externalLinks.length > 0) {
    linksSection = (<div>
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
      </div>
    );
  }

  if (tags && tags.length > 0) {
    tagsSection = (
      <TagsList tags={tags} />
    );
  }

  return (<div>
    {linksSection}
    {tagsSection}
    </div>);
};

EventNewsMeta.propTypes = {
  internalLinks: EventLinksList.propTypes.linkList,
  externalLinks: EventLinksList.propTypes.linkList,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default EventNewsMeta;
