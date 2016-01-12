import React from 'react';
import * as textStyles from '../utils/text.css';
import styles from './styles.css';
import classNames from 'classnames';

export default class Paragraph extends React.Component {
  render () {
    const pClass = classNames(textStyles[this.props.align], styles.p);
    return <p className={pClass}>{this.props.children}</p>;
  }
}

Paragraph.propTypes = {
  align: React.PropTypes.oneOf(['center', 'left', 'right']),
  children: React.PropTypes.node
};