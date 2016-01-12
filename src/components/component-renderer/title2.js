import React from 'react';
import styles from './styles.css';

export default function Title2 (props) {
  return <h2 className={styles.h2}>{props.children}</h2>;
}

Title2.propTypes = {
  children: React.PropTypes.node
};