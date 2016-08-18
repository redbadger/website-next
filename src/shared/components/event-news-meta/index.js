import React, { PropTypes } from 'react';
import styles from '../events-list/style.css';

import TagsList from '../tags-list';
import EventLinksList from '../event-links-list';

const EventNewsMeta = ({
  internalLinks,
  externalLinks,
  tags,
}) => {
  const linksSection = (<div>
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

  const tagsSection = (
    <TagsList tags={tags} />
  );

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
