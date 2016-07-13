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
import LinksListSide from '../../components/links-list-side';
import LinksList from '../../components/links-list';
import TagsList from '../../components/tags-list';
import { splitEvents } from '../../util/split-events';

import marked from 'marked';
import Helmet from 'react-helmet';

export class Event extends Component {
  static fetchData = fetchEvent(fetch());

  render() {
    const { event, events } = this.props;
    let futureEvents = splitEvents(events, 'future', { reverse: true });
    let todayEvents = splitEvents(events, 'today');


    return (
      <div className={styles.eventContainer}>
        <Helmet title={`${event.title} | Red Badger`} />
        <Section>
          <Container>
            <Grid fit={false}>
              <Cell size={1} breakOn="mobile">
                <HR color="grey"
                  customClassName={styles.mobileHorizontalLine} />
                <DateBubble
                    date={event.datetime.date}
                    month={event.datetime.monthSym}
                    year={event.datetime.year}
                />
              </Cell>
              <Cell size={8} breakOn="mobile">
                <HR color="grey" customClassName={styles.wideHorizontalLine} />
                <Grid fit={false}>
                  <Cell size={11} key='event_description' breakOn="mobileS">
                    <h2 className={styles.eventTitle}>
                      {event.title}
                    </h2>
                    <div className={styles.eventDescription}>
                      {event.strapline}
                    </div>
                    <div className={styles.eventBody}>
                      {
                        event.body.map((el, i) =>
                          (<p key={i}>
                            {marked(el.text)}
                          </p>)
                        )
                      }
                    </div>
                    {
                      event.externalLinks || event.internalLinks ?
                        <div className={styles.eventLinks}>
                          {
                            event.externalLinks ?
                              <LinksList
                                linkList={event.externalLinks}
                                listType="external" />
                              : null
                          }
                          {
                            event.internalLinks ?
                              <LinksList
                                linkList={event.internalLinks}
                                listType="internal" />
                              : null
                          }
                        </div>
                        : null
                    }
                    {
                      event.tags.length ? (
                        <div className={styles.eventTags}>
                          <TagsList
                            tags={event.tags}
                            tagsLinkPath="about-us/events" />
                        </div>
                      ) : null
                    }
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
                  <LinksListSide links={todayEvents} title='Today' listType='events' />
                  : []
                }
                { futureEvents.length ?
                  <LinksListSide links={futureEvents} title='Upcoming' listType='events' />
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
    event: state.event || firstWithSlug(routeParams.slug)(state.events),
    events: state.events,
  };
}

export default connect(
  mapStateToProps
)(Event);
