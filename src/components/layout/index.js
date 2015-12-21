import React from 'react';

import styles from './style.css';

class Layout extends React.Component {
  render () {
    return (
      <div>
        <header></header>
        <div className={styles.container} >
          {this.props.children}
        </div>
        <footer></footer>
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.element
};

export default Layout;
