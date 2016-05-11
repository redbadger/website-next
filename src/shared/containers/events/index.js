import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchEvents } from '../../actions/events';
import Section from '../../components/section';
import styles from './style.css';
import fetch from '../../util/fetch-proxy';
// import { connect } from 'react-redux';

export default class Events extends Component {
  // static propTypes = {
  //   event: React.PropTypes.shape({
  //     title: React.PropTypes.string,
  //     fullDescription: React.PropTypes.string,
  //     applicationUrl: React.PropTypes.string
  //   })
  // };
  static fetchData = fetchEvents(fetch());

  render () {
    return (
      <div>
        <div className={styles.apply}>
          <Section>
            <Container>
              <h2>Events</h2>
            </Container>
          </Section>
        </div>
      </div>
    );
  }
}

// function mapStateToProps (state, { routeParams }) {
//   return {
//     job: firstWithSlug(routeParams.id)(state.jobs)
//   };
// }

// export default connect(
//   mapStateToProps
// )(Events);
