// Displays list of links related to the event

import React, { Component } from 'react';

import classNames from 'classnames';
import layout from '../utils/layout.css';
import icons from '../icons/style.css';
import styles from './style.css';

export default class EventLinksList extends Component {
  static propTypes = {
    linkList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    listType: React.PropTypes.oneOf(['external', 'internal']).isRequired,
  };

  render() {
    if (this.props.linkList.length === 0) return null;

    const { listType } = this.props;

    return (
      <div className={classNames({
        [styles.eventLinkList]: true,
        [layout.cf]: true,
      })}>
        {
          this.props.linkList.map(eventLink => (
            <a
              className={styles.fullDetailsLink}
              href={eventLink.url}
              key={eventLink.url}
              target={listType === 'external' ? '_blank' : null}
            >
              <span>{eventLink.title}</span>
              <span className={classNames({
                [icons.sketchExternalLink]: listType === 'external',
                [icons.sketchArrowRight]: listType === 'internal',
                [styles.externalLinkIcon]: true,
              })}
              />
            </a>
          ))
        }
      </div>
    );
  }
}
