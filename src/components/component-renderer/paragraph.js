import React from 'react';
import * as textStyles from '../utils/text.css';
import styles from './styles.css';
import classNames from 'classnames';

export default class Paragraph extends React.Component {
  render () {
    return <p className={classNames(textStyles.center, styles.p)}>{this.props.children}</p>;
  }
}

Paragraph.propTypes = {
  children: React.PropTypes.node
};