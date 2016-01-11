import React from 'react';
import styles from './styles.css';

export default class Title2 extends React.Component {
  render () {
    return <h2 className={styles.h2}>{this.props.children}</h2>;
  }
}

Title2.propTypes = {
  children: React.PropTypes.node
};