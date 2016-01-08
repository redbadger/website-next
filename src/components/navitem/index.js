import React from 'react';
import styles from './style.css';

export default function NavItem (props) {
  let activeElement;
  if(props.active) {
    activeElement = <div className={styles.active}></div>;
  }

  return (
      <li className={styles.navItem}>
        <a className={styles.navItemLink} href={props.href}>{props.title}</a>
        {activeElement}
      </li>
  );
}

NavItem.propTypes = {
  active: React.PropTypes.bool,
  href: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};
