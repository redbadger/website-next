// Recent events list of links

import React, { PropTypes } from 'react';
import styles from './style.css';

import { eventNewsHref } from '../../util/eventNewsUrl';

const EventsNewsSideList = ({
  entryList,
  title,
  entryType,
}) => (
  <div className={styles.eventsSideList}>
    <div className={styles.eventsSideListTitle}>
      {title}
    </div>
    <ul>
      {
        entryList.map((entry, i) => {
          const entryDateTime = entryType === 'event' ?
          {
            year: entry.startDateTime.year,
            month: entry.startDateTime.month,
            date: entry.startDateTime.date,
          } :
          {
            year: entry.datetime.year,
            month: entry.datetime.month,
            date: entry.datetime.date,
          };
          return (
            <li key={i}>
              <a href={eventNewsHref({
                year: entryDateTime.year,
                month: entryDateTime.month,
                date: entryDateTime.date,
                slug: entry.slug,
                entryType,
              })} key={i}>
                {entry.title}
              </a>
            </li>
          );
        })
      }
    </ul>
  </div>
);

EventsNewsSideList.propTypes = {
  entryList: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  entryType: PropTypes.oneOf(['event', 'news']),
};

export default EventsNewsSideList;
