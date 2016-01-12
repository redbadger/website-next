import React from 'react';
import styles from './style.css';
import classNames from 'classnames';

export default function Section (props) {
  const sectionClass = classNames(props.className, styles.section);
  return (
    <section className={sectionClass}>
      {props.children}
    </section>
  );
}

Section.propTypes = {
  children: React.PropTypes.node
};
