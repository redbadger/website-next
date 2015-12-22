import React from 'react';
import Container from '../container';
import Logo from '../logo';
import Nav from '../nav';
import styles from './style.css';

export default class Header extends React.Component {
  render () {
    return (
      <header className={styles.header}>
        <Container>
          <a className={styles.logo} href="/">
            <Logo />
          </a>
        </Container>
      </header>
    );
  }
}
