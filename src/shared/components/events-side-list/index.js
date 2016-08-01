// Recent events list of links

import React, { Component } from 'react';
import styles from './style.css';

import { eventNewsHref } from '../../util/eventNewsUrl';

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
                  <a href={eventNewsHref({
                    year: event.startDateTime.year,
                    month: event.startDateTime.month,
                    date: event.startDateTime.date,
                    type: 'event',
                    slug: event.slug,
                  })} key={i}>
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
