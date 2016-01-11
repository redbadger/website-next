import React from 'react';
import styles from './styles.css';

export default class Title3 extends React.Component {
  render () {
    return <h3 className={styles.h3}>{this.props.children}</h3>;
  }
}

Title3.propTypes = {
  children: React.PropTypes.node
};