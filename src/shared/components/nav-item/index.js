import React from 'react';
import styles from './style.css';

export default function NavItem ({active, href, title}) {
  let activeElement;

  if (active) {
    activeElement = <div className={styles.active}></div>;
  }

  return (
    <li className={styles.navItem}>
      <a className={styles.navItemLink} to={href}>{title}</a>
      {activeElement}
    </li>
  );
}

NavItem.propTypes = {
  active: React.PropTypes.bool,
  href: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};
