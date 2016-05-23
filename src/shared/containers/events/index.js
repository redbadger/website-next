import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchEvents } from '../../actions/events';
import Section from '../../components/section';
import styles from './style.css';
import fetch from '../../util/fetch-proxy';
import { connect } from 'react-redux';

import EventsList from '../../components/events-list';

export class Events extends Component {
  static fetchData = fetchEvents(fetch());

  render () {
    return (
      <div>
        <Section>
          <Container>
            <h1 className={styles.h1}>Events</h1>
            <h2>Upcoming events</h2>
            <EventsList events={this.props.events} timeline="future" />
            <h2 className={styles.pastEventsTitle}>Past events</h2>
            <EventsList events={this.props.events} timeline="past" />
          </Container>
        </Section>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    events: state.events
  };
}

export default connect(
  mapStateToProps
)(Events);
