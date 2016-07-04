import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchNews } from '../../actions/news';
import styles from './style.css';
import fetch from '../../util/fetch-proxy';
import { connect } from 'react-redux';
import NewsList from '../../components/news-list';

import Helmet from 'react-helmet';

export class News extends Component {
  static fetchData = fetchNews(fetch());

  render() {
    return (
      <div>
        <Helmet title={'News | Red Badger'} />
        <h1 className={styles.h1}>News</h1>
        <Container>
          <NewsList news={this.props.news} />
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.news,
  };
}

export default connect(
  mapStateToProps
)(News);
