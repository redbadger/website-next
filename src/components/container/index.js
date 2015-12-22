import React from 'react';
import styles from './style.css';

export default class Container extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}

Container.propTypes = {
  children: React.PropTypes.element
};
