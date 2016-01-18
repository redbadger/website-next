import JoinUs from '../join-us';
import Layout from '../../components/layout';
import React, {Component} from 'react';
import styles from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ContentAreaActions from '../../actions/content-areas';

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

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(ContentAreaActions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Root);
