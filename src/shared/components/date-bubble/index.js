// Displays date bubble

import React, { Component } from 'react';
import styles from './style.css';

export default class DateBubble extends Component {
  static propTypes = {
    date: React.PropTypes.string,
    month: React.PropTypes.string,
    year: React.PropTypes.string,
  };

  render() {
    return (
      <div className={styles.dateBubble}>
        <div className={styles.date}>
          {this.props.date}
        </div>
        <div className={styles.month}>
          {this.props.month}
        </div>
        <div className={styles.year}>
          {this.props.year}
        </div>
      </div>
    );
  }
}
