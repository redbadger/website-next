import React from 'react';
import styles from './styles.css';

export default function Title3 (props) {
  return <h3 className={styles.h3}>{props.children}</h3>;
}

Title3.propTypes = {
  children: React.PropTypes.node
};