import React from 'react';
import styles from './style.css';

export default function JobOverview (props) {
  return (
    <div className={styles.note}>
      <a className={styles.title} href={props.href}>{props.title}<span className={styles.icon}></span></a>
      <p className={styles.paragraph}><strong>{props.subtitle}</strong></p>
      <p className={styles.paragraph}>{props.body}</p>
    </div>
  );
}

JobOverview.propTypes = {
  body: React.PropTypes.string.isRequired,
  href: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};
