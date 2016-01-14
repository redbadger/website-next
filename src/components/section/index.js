import React from 'react';
import styles from './style.css';

export default function Section (props) {
  return (
    <section className={styles.section}>
      {props.children}
    </section>
  );
}

Section.propTypes = {
  children: React.PropTypes.node
};
