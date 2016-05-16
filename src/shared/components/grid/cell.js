import classNames from 'classnames';
import React, { Component } from 'react';
import styles from './style.css';

export default class Cell extends Component {
  static propTypes = {
    breakOn: React.PropTypes.string,
    children: React.PropTypes.node,
    size: React.PropTypes.number
  };

  defaultProps = {
    breakOn: 'mobile'
  };

  render () {
    const cellClassNames = classNames(
      {
        [styles[`responsive-cell-${this.props.breakOn}`]]: true,
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
