// Displays date bubble

import React, { PropTypes } from 'react';
import styles from './style.css';

const DateBubble = ({
  startDate,
  startMonth,
  startYear,
  endDate,
  endMonth,
  endYear,
  displayDateRange,
}) => {
  let displayDateContent = '';
  if (displayDateRange) {
    displayDateContent = `${startDate} ${startMonth} ${startYear} \
    - ${endDate} ${endMonth} ${endYear}`;
  } else {
    displayDateContent = `${startDate} ${startMonth} ${startYear}`;
  }

  return (<div className={styles.dateBubble}>
    {displayDateContent}
  </div>);
};

DateBubble.propTypes = {
  startDate: PropTypes.string,
  startMonth: PropTypes.string,
  startYear: PropTypes.string,
  endDate: PropTypes.string,
  endMonth: PropTypes.string,
  endYear: PropTypes.string,
  displayDateRange: PropTypes.bool,
};

export default DateBubble;
