import React from 'react';
import styles from './styles.css';

export default function Title1 (props) {
  return <h1 className={styles.h1}>{props.children}</h1>;
}

Title1.propTypes = {
  children: React.PropTypes.node
};