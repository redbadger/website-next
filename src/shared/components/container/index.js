import React from 'react';
import styles from './style.css';

export default function Container ({children}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}

Container.propTypes = {
  children: React.PropTypes.node
};
