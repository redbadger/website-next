import classNames from 'classnames';
import React, { Component } from 'react';
import styles from './style.css';

export default class Cell extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    size: React.PropTypes.number
  };

  render () {
    const cellClassNames = classNames(
      {
        [styles.cell]: true,
        [styles['size' + this.props.size + 'of12']]: !!this.props.size
      }
    );

    return (
      <div className={cellClassNames}>
        {this.props.children}
      </div>
    );
  }
}
