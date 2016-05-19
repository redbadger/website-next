import Container from '../../components/container';
import React, { Component } from 'react';
import { fetchEvent } from '../../actions/events/event';
import Section from '../../components/section';
import styles from './style.css';
import icons from '../../components/icons/style.css';
import fetch from '../../util/fetch-proxy';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { filter, flow, head, property } from 'lodash/fp';
import isEqual from 'lodash/isEqual'; // lodash fp isEqual is broken in 4.0.0

import HR from '../../components/hr';
import { Grid, Cell } from '../../components/grid';
import DateBubble from '../../components/date-bubble';

export class Event extends Component {
  static fetchData = fetchEvent(fetch());

  render () {
    return (
      <div>
        <h1>{this.props.event.doc.attributes.title}</h1>
        <Section>
          <Container>
            <Grid fit={false}>
              {/*<Cell size={1} breakOn="mobile">
                <HR color="grey" customClassName={styles.mobileHorizontalLine} />
                <DateBubble
                    date={event.doc.datetime.date}
                    month={event.doc.datetime.month}
                    year={event.doc.datetime.year}
                />
              </Cell>
              <Cell size={11} breakOn="mobile">
                <HR color="grey" customClassName={styles.wideHorizontalLine} />
                <Grid fit={false}>
                  <Cell size={8} key='event_description' breakOn="mobileS">
                    <a className={styles.eventTitleLink} href="#">
                      <h2 className={styles.eventTitle}>
                        {event.doc.attributes.title}
                      </h2>
                      <span className={classNames(
                        {
                          [styles.arrow]: true,
                          [icons.sketchArrowRight]: true
                        })}
                      />
                    </a>
                    <div className={styles.eventDescription}>
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
                </Grid>
              </Cell>
              */}
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
    event: firstWithSlug(routeParams.slug)(state.events)
  };
}

export default connect(
  mapStateToProps
)(Event);

