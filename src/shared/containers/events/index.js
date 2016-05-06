import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchJobs } from '../../actions/jobs';
import Section from '../../components/section';
import styles from './style.css';
import fetch from '../../util/fetch-proxy';

export default class Events extends Component {
  static fetchData = fetchJobs(fetch());

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
