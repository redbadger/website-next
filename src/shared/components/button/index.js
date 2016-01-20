import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

export default function Button (props) {
  let { className, ...other } = props;
  const buttonClass = classNames(className, styles.button);
  
  if (props.href) {
    return (
      <a {...other} className={buttonClass}></a>
    );
  }

  return (
    <button {...other} className={buttonClass}></button>
  );
}

Button.propTypes = {
  className: React.PropTypes.string,
  href: React.PropTypes.string
};
