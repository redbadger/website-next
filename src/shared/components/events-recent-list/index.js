// Recent events list of links

import React, { Component } from 'react';
import styles from './style.css';

import { eventHref } from '../../util/event';

export default class EventsRecentList extends Component {
  static propTypes = {
    events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  };

  render() {
    return (
      <div className={styles.eventsRecentList}>
        <div className={styles.eventsRecentListTitle}>
          Recent events
        </div>
        <ul>
          {
            this.props.events.map(event => (
              <li>
                <a href={eventHref(event)}>
                  {event.doc.attributes.title}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
