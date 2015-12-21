import React, {Component} from 'react';
import Layout from '../layout';
import Home from '../home';

class Root extends Component {
  render () {
    return (
      <Layout>
        <Home />
      </Layout>
    );
  }
}

export default Root;
