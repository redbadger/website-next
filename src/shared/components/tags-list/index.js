import React, { Component } from 'react';
import classNames from 'classnames';
import layout from '../utils/layout.css';
import icons from '../icons/style.css';
import styles from './style.css';

export default class TagsList extends Component {
  static propTypes = {
    tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    tagsLinkPath: React.PropTypes.string.isRequired,
  };

  render() {
    if (this.props.tags.length === 0) return null;

    return (
      <div className={classNames({
        [layout.cf]: true,
        [styles.tagsList]: true,
      })}>
        <span className={icons.sketchTag} />
        <ul>
          { this.props.tags.map((tag, index) => (
            <li key={index}>
              <a href={`/${this.props.tagsLinkPath}/${tag}`}
                className={styles.tagsListLink}
                title={`Read more content related to "${tag}"`}>{tag}</a>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}
