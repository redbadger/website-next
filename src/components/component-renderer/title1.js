import React from 'react';
import styles from './styles.css';

export default class Title1 extends React.Component {
  render () {
    return <h1 className={styles.h1}>{this.props.children}</h1>;
  }
}

Title1.propTypes = {
  children: React.PropTypes.node
};