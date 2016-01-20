import React from 'react';
import styles from './style.css';

export default function Note (props) {
  return (
    <div className={styles.note}>
      {props.children}
    </div>
  );
}

Note.propTypes = {
  children: React.PropTypes.node.isRequired
};
