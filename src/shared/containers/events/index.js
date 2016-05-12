import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchEvents } from '../../actions/events';
import Section from '../../components/section';
import styles from './style.css';
import fetch from '../../util/fetch-proxy';
import { connect } from 'react-redux';

import HR from '../../components/hr';
import Link from '../../components/component-renderer/link';

export class Events extends Component {
  static fetchData = fetchEvents(fetch());

  render () {
    return (
      <div>
        <div className={styles.apply}>
          <Section>
            <Container>
              <h2>Events</h2>
              <ul>
              {
                this.props.events.map((event) => {
                  return (
                    <li key={`event_${event.id}`}>
                      <HR color="grey" />
                      <Link href="#">
                        {event.doc.attributes.title}
                      </Link>
                      <div>
                        {event.doc.attributes.strapline}
                      </div>
                      <Link href="#">
                        For full details please visit
                      </Link>
                    </li>
                    );
                })
              }
              </ul>
            </Container>
          </Section>
        </div>
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
