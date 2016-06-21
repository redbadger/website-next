// Recent events list of links

import React, { Component } from 'react';
import styles from './style.css';

import { eventHref } from '../../util/event';

export default class EventsSideList extends Component {
  static propTypes = {
    events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  };

  render() {
    return (
      <div className={styles.eventsSideList}>
        <div className={styles.eventsSideListTitle}>
          {this.props.title}
        </div>
        <ul>
          {
            this.props.events.map((event, i) =>
              (
                <li key={i}>
                  <a href={eventHref(event)} key={i}>
                    {event.title}
                  </a>
                </li>
              )
            )
          }
        </ul>
      </div>
    );
  }
}
