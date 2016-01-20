import React from 'react';
import JoinUs from '../join-us';
import Layout from '../../components/layout';
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
