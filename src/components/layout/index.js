import React from 'react';
import Header from '../header';
import styles from './style.css';

class Layout extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        <Header />
        {this.props.children}
        <footer></footer>
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.element
};

export default Layout;
