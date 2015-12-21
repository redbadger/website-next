import React from 'react';
import Logo from '../logo';
import styles from './style.css';

export default class Header extends React.Component {
  render () {
    return (
      <header className={styles.header}>
        <a className={styles.logo} href="/">
          <Logo />
        </a>
      </header>
    );
  }
}
