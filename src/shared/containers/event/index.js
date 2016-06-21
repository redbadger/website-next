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
import EventsSideList from '../../components/events-side-list';
import EventLinksList from '../../components/event-links-list';
import { splitEvents } from '../../util/split-events';

import marked from 'marked';
import Helmet from 'react-helmet';

export class Event extends Component {
  static fetchData = fetchEvent(fetch());

  render() {
    let futureEvents = splitEvents(this.props.events, 'future', { reverse: true });
    let todayEvents = splitEvents(this.props.events, 'today');

    return (
      <div className={styles.eventContainer}>
        <Helmet title={`${this.props.event.title} | Red Badger`} />
        <Section>
          <Container>
            <Grid fit={false}>
              <Cell size={1} breakOn="mobile">
                <HR color="grey"
                  customClassName={styles.mobileHorizontalLine} />
                <DateBubble
                    date={this.props.event.datetime.date}
                    month={this.props.event.datetime.monthSym}
                    year={this.props.event.datetime.year}
                />
              </Cell>
              <Cell size={8} breakOn="mobile">
                <HR color="grey" customClassName={styles.wideHorizontalLine} />
                <Grid fit={false}>
                  <Cell size={11} key='event_description' breakOn="mobileS">
                    <h2 className={styles.eventTitle}>
                      {this.props.event.title}
                    </h2>
                    <div className={styles.eventDescription}>
                      {this.props.event.strapline}
                    </div>
                    <div className={styles.eventBody}>
                      {
                        this.props.event.body.map((el, i) =>
                          (<p key={i}>
                            {marked(el.text)}
                          </p>)
                        )
                      }
                    </div>
                    <div>
                    {
                      this.props.event.externalLinks ?
                        <EventLinksList
                          linkList={this.props.event.externalLinks}
                          listType="external" />
                        : null
                    }
                    {
                      this.props.event.internalLinks ?
                        <EventLinksList
                          linkList={this.props.event.internalLinks}
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
                { todayEvents.length ?
                  <EventsSideList events={todayEvents} title='Today'/>
                  : []
                }
                { futureEvents.length ?
                  <EventsSideList events={futureEvents} title='Upcoming'/>
                  : []
                }

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
    filter((event) => isEqual(slug, property('slug')(event))),
    head
  );
}

function mapStateToProps(state, { routeParams }) {
  return {
    event: firstWithSlug(routeParams.slug)(state.events),
    events: state.events,
  };
}

export default connect(
  mapStateToProps
)(Event);
