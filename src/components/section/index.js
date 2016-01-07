import React from 'react';
import styles from './style.css';

export default class Section extends React.Component {
  render () {
    return (
      <section className={styles.section}>
        {this.props.children}
      </section>
    );
  }
}

Section.propTypes = {
  children: React.PropTypes.node
};
