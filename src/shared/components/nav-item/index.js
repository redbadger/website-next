import React from 'react';
import styles from './style.css';

import { Link } from 'react-router';

export default function NavItem ({active, href, title}) {
  let activeElement;

  if (active) {
    activeElement = <div className={styles.active}></div>;
  }

  return (
    <li className={styles.navItem}>
      <Link className={styles.navItemLink} to={href}>{title}</Link>
      {activeElement}
    </li>
  );
}

NavItem.propTypes = {
  active: React.PropTypes.bool,
  href: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};
