import React from 'react';
import * as textStyles from '../utils/text.css';
import styles from './styles.css';
import classNames from 'classnames';

export default function Paragraph (props) {
  const pClass = classNames(textStyles[props.align], styles.p);
  return <p className={pClass}>{props.children}</p>;
}

Paragraph.propTypes = {
  align: React.PropTypes.oneOf(['center', 'left', 'right']),
  children: React.PropTypes.node
};