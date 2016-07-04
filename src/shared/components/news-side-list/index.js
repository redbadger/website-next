// Recent news list of links

import React, { Component } from 'react';
import styles from './style.css';

import { newsItemHref } from '../../util/url-helper';

export default class EventsSideList extends Component {
  static propTypes = {
    news: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  };

  render() {
    return (
      <div className={styles.newsSideList}>
        <div className={styles.newsSideListTitle}>
          Recent News
        </div>
        <ul>
          {
            this.props.news.map((newsItem, i) =>
              (
                <li key={i}>
                  <a href={newsItemHref(newsItem)} key={i}>
                    {newsItem.title}
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
