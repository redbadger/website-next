import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchEvent } from '../../actions/events/event';
import Section from '../../components/section';
import styles from './style.css';
import fetch from '../../util/fetch-proxy';
import { connect } from 'react-redux';
import { filter, flow, head, property } from 'lodash/fp';
import isEqual from 'lodash/isEqual'; // lodash fp isEqual is broken in 4.0.0

import HR from '../../components/hr';
import { Grid, Cell } from '../../components/grid';
import DateBubble from '../../components/date-bubble';
import EventsRecentList from '../../components/events-recent-list';
import EventLinksList from '../../components/event-links-list';

import marked from 'marked';
import Helmet from 'react-helmet';

export class Event extends Component {
  static fetchData = fetchEvent(fetch());

  render () {
    return (
      <div className={styles.eventContainer}>
        <Helmet title={`${this.props.event.doc.attributes.title} | Red Badger`} />
        <Section>
          <Container>
            <Grid fit={false}>
              <Cell size={1} breakOn="mobile">
                <HR color="grey" customClassName={styles.mobileHorizontalLine} />
                <DateBubble
                    date={this.props.event.doc.datetime.date}
                    month={this.props.event.doc.datetime.monthSym}
                    year={this.props.event.doc.datetime.year}
                />
              </Cell>
              <Cell size={8} breakOn="mobile">
                <HR color="grey" customClassName={styles.wideHorizontalLine} />
                <Grid fit={false}>
                  <Cell size={11} key='event_description' breakOn="mobileS">
                    <h2 className={styles.eventTitle}>
                      {this.props.event.doc.attributes.title}
                    </h2>
                    <div className={styles.eventDescription}>
                      {this.props.event.doc.attributes.strapline}
                    </div>
                    <div className={styles.eventBody}>
                      {marked(this.props.event.doc.body)}
                    </div>
                    <div>
                    {
                      this.props.event.doc.attributes.externalLinks ?
                        <EventLinksList
                          linkList={this.props.event.doc.attributes.externalLinks}
                          listType="external" />
                        : null
                    }
                    {
                      this.props.event.doc.attributes.internalLinks ?
                        <EventLinksList
                          linkList={this.props.event.doc.attributes.internalLinks}
                          listType="internal" />
                        : null
                    }
                    </div>
                  </Cell>
                </Grid>
                <HR color="grey" />
                <div className={styles.moreEvents}>
                  <a href="/about-us/events">
                    <span className={styles.arrowBack} />
                    <span>More events</span>
                  </a>
                </div>
              </Cell>
              <Cell size={3} breakOn="mobile">
                <EventsRecentList events={this.props.recentEvents} />
              </Cell>
            </Grid>
          </Container>
        </Section>
      </div>
    );
  }
}

// This can be made much nicer when lodash 4.0.1 is released
function firstWithSlug (slug) {
  return flow(
    filter((event) => {
      return isEqual(slug, property('slug')(event.doc));
    }),
    head
  );
}

function mapStateToProps (state, { routeParams }) {
  return {
    event: firstWithSlug(routeParams.slug)(state.events),
    recentEvents: state.events.slice(0, 10)
  };
}

export default connect(
  mapStateToProps
)(Event);

