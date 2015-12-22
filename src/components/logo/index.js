import React from 'react';
import styles from './style.css';
import image from './logo.png';

const Logo = function () {
  return (
    <img alt="Red Badger Logo" className={styles.logo} src={image} />
  );
};

export default Logo;
