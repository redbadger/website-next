import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchTaggedDocs } from '../../actions/tagged-docs';
import Section from '../../components/section';
import styles from './style.css';
import fetch from '../../util/fetch-proxy';
import { connect } from 'react-redux';
import EventsList from '../../components/events-list';
import NewsList from '../../components/news-list';
import Helmet from 'react-helmet';

export class Tag extends Component {
  static fetchData = fetchTaggedDocs(fetch());

  render() {
    const { tag, taggedDocs } = this.props;

    return (
      <div>
        <Helmet title={`Items tagged with "${tag}" | Red Badger`} />
        <Section>
          <Container>
            <h1 className={styles.h1}>
              <span className={styles.headingLeadLine}>
                Blogs, ideas, events, news tagged with
              </span>
              {tag}
            </h1>
            {taggedDocs.allEvents &&
              <section>
                <h2>Events</h2>
                <EventsList events={taggedDocs.allEvents} />
              </section>
            }
            {taggedDocs.allNews &&
              <section>
                <h2>News</h2>
                <NewsList news={taggedDocs.allNews} />
              </section>
            }
            {(!taggedDocs.allEvents && !taggedDocs.allNews) &&
              <p>
                {`We don't have anything related to "${tag}" at the moment`}
              </p>
            }
          </Container>
        </Section>
      </div>
    );
  }
}

function mapStateToProps(state, { routeParams }) {
  return {
    tag: routeParams.tag,
    taggedDocs: state.taggedDocs,
  };
}

export default connect(
  mapStateToProps
)(Tag);
