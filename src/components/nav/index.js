import React from 'react';
import Badge from '../badge';
import styles from './style.css';

export default class Nav extends React.Component {
  render () {
    return (
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/">Home</a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/our-work">Our Work</a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/services">Services</a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/ideas">Ideas</a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/blog">Blog</a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/about-us">About us</a>
            <div className={styles.active}></div>
          </li>
        </ul>
        <div className={styles.badge}>
          <Badge/>
        </div>
      </nav>
    );
  }
}
