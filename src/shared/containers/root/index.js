import React from 'react';
import Layout from '../../components/layout';
import styles from './style.css';

export default function Root ({ children }) {
  return (
    <div className={styles.root}>
      <Layout>
        {children}
      </Layout>
    </div>
  );
}