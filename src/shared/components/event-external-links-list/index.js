// Displays list of links related to the event

import React, { Component } from 'react';
import styles from './style.css';

import classNames from 'classnames';
import icons from '../icons/style.css';

export default class EventExternalLinksList extends Component {
  static propTypes = {
    linkList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  };

  render () {
    if (this.props.linkList.length > 0) {
      return (
        <div>
          {
            this.props.linkList.map((eventLink) => {
              return (
                <a href={eventLink.url} className={styles.fullDetailsLink} target="_blank" key={eventLink.url}>
                  <span>{eventLink.title}</span>
                  <span className={classNames({
                    [icons.sketchExternalLink]: true,
                    [styles.externalLinkIcon]: true
                  })}
                  />
                </a>
              );
            })
          }
        </div>
      );
    }

    return null;
  }
}
