import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchNewsItem } from '../../actions/news/news-item';
import Section from '../../components/section';
import styles from './style.css';
import fetch from '../../util/fetch-proxy';
import { connect } from 'react-redux';
import { filter, flow, head, property } from 'lodash/fp';
import isEqual from 'lodash/isEqual'; // lodash fp isEqual is broken in 4.0.0

import HR from '../../components/hr';
import { Grid, Cell } from '../../components/grid';
import DateBubble from '../../components/date-bubble';
import NewsSideList from '../../components/news-side-list';
import LinksList from '../../components/links-list';
import TagsList from '../../components/tags-list';

import marked from 'marked';
import Helmet from 'react-helmet';

export class NewsItem extends Component {
  static fetchData = fetchNewsItem(fetch());

  render() {
    const { newsItem, news } = this.props;

    return (
      <div className={styles.newsItemContainer}>
        <Helmet title={`${newsItem.title} | Red Badger`} />
        <Section>
          <Container>
            <Grid fit={false}>
              <Cell size={1} breakOn="mobile">
                <HR color="grey"
                  customClassName={styles.mobileHorizontalLine} />
                <DateBubble
                    date={newsItem.datetime.date}
                    month={newsItem.datetime.monthSym}
                    year={newsItem.datetime.year}
                />
              </Cell>
              <Cell size={8} breakOn="mobile">
                <HR color="grey" customClassName={styles.wideHorizontalLine} />
                <Grid fit={false}>
                  <Cell size={11} key='newsItem_description' breakOn="mobileS">
                    <h2 className={styles.newsItemTitle}>
                      {newsItem.title}
                    </h2>
                    <div className={styles.newsItemDescription}>
                      <strong>{newsItem.strapline}</strong>
                    </div>
                    <div className={styles.newsItemBody}>
                      {
                        newsItem.body.map((el, i) =>
                          (<p key={i}>
                            {marked(el.text)}
                          </p>)
                        )
                      }
                    </div>
                    {
                      newsItem.externalLinks || newsItem.internalLinks ?
                        <div className={styles.newsItemLinks}>
                          {
                            newsItem.externalLinks ?
                              <LinksList
                                linkList={newsItem.externalLinks}
                                listType="external" />
                              : null
                          }
                          {
                            newsItem.internalLinks ?
                              <LinksList
                                linkList={newsItem.internalLinks}
                                listType="internal" />
                              : null
                          }
                        </div>
                        : null
                    }
                    {
                      newsItem.tags.length ? (
                        <div className={styles.newsItemTags}>
                          <TagsList
                            tags={newsItem.tags}
                            tagsLinkPath="about-us/news" />
                        </div>
                      ) : null
                    }
                  </Cell>
                </Grid>
                <HR color="grey" />
                <div className={styles.moreNewsItems}>
                  <a href="/about-us/news">
                    <span className={styles.arrowBack} />
                    <span>More news</span>
                  </a>
                </div>
              </Cell>
              <Cell size={3} breakOn="mobile">
                <NewsSideList news={news.slice(0, 10)} />
              </Cell>
            </Grid>
          </Container>
        </Section>
      </div>
    );
  }
}

// This can be made much nicer when lodash 4.0.1 is released
function firstWithSlug(slug) {
  return flow(
    filter((newsItem) => isEqual(slug, property('slug')(newsItem))),
    head
  );
}

function mapStateToProps(state, { routeParams }) {
  return {
    newsItem: state.newsItem || firstWithSlug(routeParams.slug)(state.news),
    news: state.news,
  };
}

export default connect(
  mapStateToProps
)(NewsItem);
