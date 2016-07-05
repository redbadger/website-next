// Display list of news
// You can request only displaying news of past or future
// with the `timeline` prop

/* eslint-disable max-len */

import React, { Component } from 'react';

import EventImage from '../event-image';
import { imageAssetsEndpoint } from '../../config';
import DateBubble from '../date-bubble';
import HR from '../hr';
import { Grid, Cell } from '../grid';
import classNames from 'classnames';
import icons from '../icons/style.css';

import TagsList from '../tags-list';
import LinksList from '../links-list';
import { newsItemHref } from '../../util/url-helper';
import layout from '../utils/layout.css';
import typography from '../../components/typography/style.css';
import styles from './style.css';

export default class EventsList extends Component {
  static propTypes = {
    news: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  };

  render() {
    if (this.props.news.length > 0) {
      const newsImageAssetsEndpoint = `${imageAssetsEndpoint}/news/`;

      return (
        <div className={styles.newsListTimelineSection}>
          <ul className={styles.newsList}>
            {
              this.props.news.map((news) => (
                  <li key={`news_${news.id}`} className={styles.newsItem}>
                    <Grid fit={false}>
                      <Cell size={1} breakOn="mobile">
                        <HR color="grey" customClassName={styles.mobileHorizontalLine} />
                        <DateBubble
                            date={news.datetime.date}
                            month={news.datetime.monthSym}
                            year={news.datetime.year}
                        />
                      </Cell>
                      <Cell size={1} key="news_picture_mobile" hideOn="mobileSM">
                        <EventImage imgPath={ newsImageAssetsEndpoint + (news.featureImageFilename ? news.featureImageFilename : 'red-badger.jpg') } href={newsItemHref(news)} />
                      </Cell>
                      <Cell size={11} breakOn="mobile">
                        <HR color="grey" customClassName={styles.wideHorizontalLine} />
                        <Grid fit={false}>
                          <Cell size={8} key='news_description' breakOn="mobileS">
                            <a className={styles.newsTitleLink} href={newsItemHref(news)}>
                              <h2 className={classNames(
                                {
                                  [typography.h2]: true,
                                  [styles.newsTitle]: true,
                                })}>
                                <span>
                                  {news.title}
                                </span>
                                <span className={classNames(
                                  {
                                    [styles.arrow]: true,
                                    [icons.sketchArrowRight]: true,
                                  })}
                                />
                              </h2>
                            </a>
                            <div className={styles.newsDescription}>
                              {news.strapline}
                            </div>
                            {
                              news.externalLinks || news.internalLinks ?
                                <div className={classNames(
                                  {
                                    [layout.cf]: true,
                                    [styles.newsLinks]: true,
                                  })}>
                                {
                                  news.externalLinks ?
                                    <LinksList
                                      linkList={news.externalLinks}
                                      listType="external" />
                                    : null
                                }
                                {
                                  news.internalLinks ?
                                    <LinksList
                                      linkList={news.internalLinks}
                                      listType="internal" />
                                    : null
                                }
                                </div>
                              : null
                            }
                            {
                              news.tags
                              ? <TagsList
                                  tags={news.tags}
                                  tagsLinkPath="about-us/news" />
                              : null
                            }
                          </Cell>
                          <Cell size={4} key='news_picture' breakOn="mobileS" hideOn="mobileS">
                            <EventImage imgPath={ newsImageAssetsEndpoint + (news.featureImageFilename ? news.featureImageFilename : 'red-badger.jpg') } href={newsItemHref(news)} />
                          </Cell>
                        </Grid>
                      </Cell>
                    </Grid>
                  </li>
              ))
            }
          </ul>
        </div>
      );
    }

    return null;
  }
}
