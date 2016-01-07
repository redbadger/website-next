import React from 'react';
import styles from './style.css';

export default function Vimeo (props) {
  const source = "https://player.vimeo.com/video/" + props.id;
  return (
    <div className={styles.vimeo}>
      <iframe allowFullScreen className={styles.embed} frameBorder="0" src={source}></iframe>
    </div>
  );
}

Vimeo.propTypes = {
  id: React.PropTypes.string
};
