import React from 'react';
import styles from './style.css';

export default function YouTube (props) {
  const source = "https://www.youtube.com/embed/" + props.id;
  return (
    <div className={styles.container}>
      <iframe allowFullScreen className={styles.embed} frameBorder="0" src={source}></iframe>
    </div>
  );
}

YouTube.propTypes = {
  id: React.PropTypes.string
};
