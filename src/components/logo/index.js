import React from 'react';
import styles from './style.css';
import image from './logo.png';

const Layout = function () {
  return (
    <img alt="Red Badger Logo" className={styles.logo} src={image} />
  );
};

export default Layout;
