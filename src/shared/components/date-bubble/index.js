// Displays date bubble
/* eslint-disable max-len */

import React, { Component } from 'react';
import styles from './style.css';

export default class DateBubble extends Component {
  static propTypes = {
    startDate: React.PropTypes.string,
    startMonth: React.PropTypes.string,
    startYear: React.PropTypes.string,
    endDate: React.PropTypes.string,
    endMonth: React.PropTypes.string,
    endYear: React.PropTypes.string,
    displayDateRange: React.PropTypes.boolean,
  };

  render() {
    const displayDate = this.props.displayDateRange ?
      `${this.props.startDate} ${this.props.startMonth} ${this.props.startYear} - ${this.props.endDate} ${this.props.endMonth} ${this.props.endYear}`
      : `${this.props.startDate} ${this.props.startMonth} ${this.props.startYear}`;
    return (
      <div className={styles.dateBubble}>
        {displayDate}
      </div>
    );
  }
}
