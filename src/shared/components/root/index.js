import React from 'react';
import Layout from '../layout';
import JoinUs from '../join-us';
import styles from './style.css';

export default function Root () {
  return (
    <div className={styles.root}>
      <Layout>
        <JoinUs />
      </Layout>
    </div>
  );
}
