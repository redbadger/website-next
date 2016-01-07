import React from 'react';
// The plan is to only use youtube in future so we declare the styles there.
import styles from '../youtube/style.css';

export default function Vimeo (props) {
  const source = "https://player.vimeo.com/video/" + props.id;
  return (
    <div className={styles.container}>
      <iframe allowFullScreen className={styles.embed} frameBorder="0" src={source}></iframe>
    </div>
  );
}

Vimeo.propTypes = {
  id: React.PropTypes.string
};
