import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchEvents } from '../../actions/events';
import Section from '../../components/section';
import styles from './style.css';
import fetch from '../../util/fetch-proxy';
import { connect } from 'react-redux';

export class News extends Component {
  static fetchData = fetchEvents(fetch());

  render() {
    return (
      <div>
        <h1 className={styles.h1}>News</h1>
        <Section>
          <Container>
            <ul className={styles.eventsList}>
              {
                this.props.news.map((newsItem) => (
                  <EventsListEntry
                    event={newsItem}
                    key={`key_${newsItem.id}`}
                    timeline="past"
                  />
                ))
              }
            </ul>
          </Container>
        </Section>
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
