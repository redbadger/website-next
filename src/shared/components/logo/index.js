import React from 'react';
import styles from './style.css';
import image from './logo.png';

export default function Logo () {
  return (
    <img alt="Red Badger Logo" className={styles.logo} src={image} />
  );
}
