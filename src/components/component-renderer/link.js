import React from 'react';
import styles from './styles.css';

export default class Link extends React.Component {
  render () {
    return <a className={styles.a} href={this.props.href}>{this.props.children}</a>;
  }
}

Link.propTypes = {
  children: React.PropTypes.node,
  href: React.PropTypes.string.isRequired
};