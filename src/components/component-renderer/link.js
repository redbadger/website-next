import React from 'react';
import styles from './styles.css';

export default function Link (props) {
  return <a className={styles.a} href={props.href}>{props.children}</a>;
}

Link.propTypes = {
  children: React.PropTypes.node,
  href: React.PropTypes.string.isRequired
};