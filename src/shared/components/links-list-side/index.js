// List of side links

import React, { Component } from 'react';
import styles from './style.css';

import { eventHref, newsItemHref } from '../../util/url-helper';

export default class EventsSideList extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    listType: React.PropTypes.oneOf(['events', 'news']).isRequired,
    links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  };

  getLink(link) {
    return (this.props.listType === 'events') ?
      eventHref(link) : newsItemHref(link);
  }

  render() {
    return (
      <div className={styles.linksListSide}>
        <div className={styles.linksListSideTitle}>
          {this.props.title}
        </div>
        <ul>
          {
            this.props.links.map((link, i) =>
              (
                <li key={i}>
                  <a href={this.getLink(link)} key={i}>
                    {link.title}
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
