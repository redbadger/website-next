import JoinUs from '../join-us';
import Layout from '../../components/layout';
import React, {Component} from 'react';
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
