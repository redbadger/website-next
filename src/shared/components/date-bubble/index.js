// Displays date bubble

import React, { PropTypes } from 'react';
import styles from './style.css';

const DateBubble = ({
  startDateTime,
  endDateTime,
}) => {
  let displayDateContent = '';
  if (endDateTime) {
    displayDateContent =
    (`${startDateTime.date} ${startDateTime.monthSym} ${startDateTime.year} - `
    + `${endDateTime.date} ${endDateTime.monthSym} ${endDateTime.year}`);
  } else {
    displayDateContent =
    `${startDateTime.date} ${startDateTime.monthSym} ${startDateTime.year}`;
  }

  return (<div className={styles.dateBubble}>
    {displayDateContent}
  </div>);
};

const dateShape = {
  date: PropTypes.string.isRequired,
  monthSym: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

DateBubble.propTypes = {
  startDateTime: PropTypes.shape(dateShape).isRequired,
  endDateTime: PropTypes.shape(dateShape),
};

export default DateBubble;
