import React, { Component } from 'react';
import styles from './style.css';

export default class Badge extends Component {
  render () {
    return (
      <span className={styles.badge}></span>
    );
  }
}
