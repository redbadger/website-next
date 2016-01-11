import React, {Component} from 'react';
import Layout from '../layout';
import JoinUs from '../join-us';
import styles from './style.css';

class Root extends Component {
  render () {
    return (
      <div className={styles.root}>
        <Layout>
          <JoinUs />
        </Layout>
      </div>
    );
  }
}

export default Root;
