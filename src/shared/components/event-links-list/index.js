// Displays list of links related to the event

import React, { Component } from 'react';
import styles from './style.css';

import classNames from 'classnames';
import icons from '../icons/style.css';

export default class EventLinksList extends Component {
  static propTypes = {
    linkList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    listType: React.PropTypes.oneOf(['external', 'internal']).isRequired
  };

  render () {
    if (this.props.linkList.length > 0) {
      return (
        <div>
          {
            this.props.linkList.map((eventLink) => {
              return (
                <a
                    className={styles.fullDetailsLink}
                    href={eventLink.url}
                    key={eventLink.url}
                    target={this.props.listType === 'external' ? '_blank' : null}
                >
                  <span>{eventLink.title}</span>
                  <span className={classNames({
                    [icons.sketchExternalLink]: this.props.listType === 'external',
                    [icons.sketchArrowRight]: this.props.listType === 'internal',
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
