import React, { PropTypes } from 'react';
import styles from './style.css';
import classNames from 'classnames';
import icons from '../icons/style.css';

const EventTitle = ({
  eventTitle,
  eventHref,
}) => (
  <a className={styles.eventTitleLink}
    href={eventHref}>
    <h2 className={styles.eventTitle}>
      <span>
        {eventTitle}
      </span>
      <span className={classNames(
        {
          [styles.arrow]: true,
          [icons.sketchArrowRight]: true,
        })}
      />
    </h2>
  </a>
);

EventTitle.propTypes = {
  eventTitle: PropTypes.string.isRequired,
  eventHref: PropTypes.string.isRequired,
};

export default EventTitle;
