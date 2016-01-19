import React from 'react';
import styles from './style.css';

export default function Container ({children}) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: React.PropTypes.node
};
