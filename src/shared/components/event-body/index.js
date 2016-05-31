import React, { Component } from 'react';
import styles from './styles.css';

export default class EventBody extends Component {
  static propTypes = {
  };

  render () {
    return (
      <div>
        <textarea className={styles.eventTextArea} name="body" type="text"></textarea><br/><br/>
      </div>
    );
  }
}
