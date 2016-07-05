// Displays list of links related to the item

import React, { Component } from 'react';

import classNames from 'classnames';
import layout from '../utils/layout.css';
import icons from '../icons/style.css';
import styles from './style.css';

export default class LinksList extends Component {
  static propTypes = {
    linkList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    listType: React.PropTypes.oneOf(['external', 'internal']).isRequired,
  };

  render() {
    if (this.props.linkList.length === 0) return null;

    const { listType } = this.props;

    return (
      <div className={classNames({
        [styles.linkList]: true,
        [layout.cf]: true,
      })}>
        {
          this.props.linkList.map(link => (
            <a
              className={styles.fullDetailsLink}
              href={link.url}
              key={link.url}
              target={listType === 'external' ? '_blank' : null}
            >
              <span>{link.title}</span>
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
