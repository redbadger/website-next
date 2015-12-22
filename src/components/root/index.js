import React, {Component} from 'react';
import Layout from '../layout';
import Home from '../home';
import styles from './style.css';

class Root extends Component {
  render () {
    return (
      <div className={styles.root}>
        <Layout>
          <Home />
        </Layout>
      </div>
    );
  }
}

export default Root;
