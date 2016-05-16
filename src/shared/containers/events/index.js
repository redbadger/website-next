import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchEvents } from '../../actions/events';
import Section from '../../components/section';
import styles from './style.css';
import icons from '../../components/icons/style.css';
import fetch from '../../util/fetch-proxy';
import { connect } from 'react-redux';
import classNames from 'classnames';

import HR from '../../components/hr';
import { Grid, Cell } from '../../components/grid';
import Link from '../../components/component-renderer/link';
import DateBubble from '../../components/date-bubble';
import { imageAssetsEndpoint } from '../../config';

export class Events extends Component {
  static fetchData = fetchEvents(fetch());

  render () {
    return (
      <div>
        <div className={styles.apply}>
          <Section>
            <Container>
              <h1 className={styles.h1}>Events</h1>
              <ul className={styles.eventsList}>
              {
                this.props.events.map((event) => {
                  return (
                    <li key={`event_${event.id}`} className={styles.eventItem}>
                      <HR color="grey" />
                      <DateBubble
                          date={event.doc.datetime.date}
                          month={event.doc.datetime.month}
                          year={event.doc.datetime.year}
                      />
                      <Grid fit={false} >
                        <Cell size={8} key='event_description'>
                          <Link href="#">
                            <h2 className={styles.eventTitle}>
                              {event.doc.attributes.title}
                            </h2>
                            <span className={classNames(
                              {
                                [styles.arrow]: true,
                                [icons.sketchArrowRight]: true
                              })}
                            />
                          </Link>
                          <div>
                            {event.doc.attributes.strapline}
                          </div>
                          <a href="#" className={styles.fullDetailsLink}>
                              <span>For full details please visit</span>
                              <span className={classNames({
                                [icons.sketchExternalLink]: true,
                                [styles.externalLinkIcon]: true
                              })}
                              />
                          </a>
                        </Cell>
                        <Cell size={4} key='event_picture'>
                          <img className={styles.eventPicture} src={ imageAssetsEndpoint + event.doc.attributes.featureImageFilename } />
                        </Cell>
                      </Grid>
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
