import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './style.css';

export default class HR extends Component {
  static propTypes = {
    color: React.PropTypes.oneOf(['red', 'grey'])
  };

  render () {
    const hrClass = classNames({
      [styles.hr]: true,
      [styles.red]: (this.props.color === 'red'),
      [styles.grey]: (this.props.color === 'grey')
    });

    return (
      <hr className={hrClass} />
    );
  }
}
