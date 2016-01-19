import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

export default function Input (props) {
  let { className, ...other } = props;
  const inputClass = classNames(className, styles.input);
  return (
    <input {...other} className={inputClass}></input>
  );
}

Input.propTypes = {
  className: React.PropTypes.string
};
