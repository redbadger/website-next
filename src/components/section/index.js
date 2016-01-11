import React from 'react';
import styles from './style.css';
import classNames from 'classnames';

export default class Section extends React.Component {
  render () {
    const sectionClass = classNames(this.props.className, styles.section);
    return (
      <section className={sectionClass}>
        {this.props.children}
      </section>
    );
  }
}

Section.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
};
