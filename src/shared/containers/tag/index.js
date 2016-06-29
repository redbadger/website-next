import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchEvents } from '../../actions/events';
import Section from '../../components/section';
import styles from './style.css';
import fetch from '../../util/fetch-proxy';
import { connect } from 'react-redux';
import EventsList from '../../components/events-list';

export class Tag extends Component {
  static fetchData = fetchEvents(fetch());

  render() {
    const { tag, events } = this.props;

    return (
      <div>
        <Section>
          <Container>
            <h1 className={styles.h1}>
              <span className={styles.headingLeadLine}>
                Blogs, ideas, events tagged with
              </span>
              {tag}
            </h1>
            {
              events.length
              ? <EventsList events={events} />
              : <p>
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
    events: state.events.filter((event) => (
      event.tags.indexOf(routeParams.tag) !== -1
    )),
  };
}

export default connect(
  mapStateToProps
)(Tag);
