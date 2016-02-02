import React, { Component } from 'react';
import styles from './style.css';
import classnames from 'classnames';

export default class Container extends Component {
  static propTypes = {
    background: React.PropTypes.oneOf(["error"]),
    children: React.PropTypes.node
  };

  static defaultProps = {
    children: []
  };

  render () {
    const outerClass = classnames(styles.wrapper, {
      [styles['error-background']]: this.props.background === "error"
    });
    return (
      <div className={outerClass}>
        <div className={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
