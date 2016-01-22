import React from 'react';
import { connect } from 'react-redux';
import HtmlParser from '../../components/html-parser';
import { Grid, Cell } from '../../components/grid';
import Container from '../../components/container';
import Section from '../../components/section';
import Note from '../../components/note';
import styles from './style.css';
import typography from '../../components/typography/style.css';
import { Link } from 'react-router';
import { filter, flow, head, property } from 'lodash/fp';
import isEqual from 'lodash/isEqual'; // lodash fp isEqual is broken in 4.0.0

const howToApplyP = (
  <p className={typography.p}>
  If you'd like more information, you want to apply, or you'd simply like to
  say 'hello', then please get in touch with your CV, Stackoverflow profile,
  Github, code, portfolio and anything else you think we might be interested in,
  at:{' '}<a className={typography.a} href="mailto:jobs@red-badger.com">jobs@red-badger.com</a>.
  </p>
);

export function Job ({ job }) {
  return (
    <Section>
      <Container>
        <Grid>
          <Cell size={8}>
            <h2 className={typography.h2}>{job.title}</h2>
            <HtmlParser>{job.description}</HtmlParser>
            <hr />
            <Link className={typography.a} to="/about-us/join-us">See all vacancies</Link>
          </Cell>
          <Cell size={4}>
            <Note>
              <h2 className={styles.noteTitle}>How to Apply</h2>
              {howToApplyP}
            </Note>
          </Cell>
        </Grid>
      </Container>
    </Section>
  );
}

// This can be made much nicer when lodash 4.0.1 is released
function firstWithSlug (slug) {
  return flow(
    filter((job) => {
      return isEqual(slug, property('slug')(job));
    }),
    head
  );
}

// I think connect should be moved to make this component just care about
// getting a job. React router should be doing a level of this so that
// we can send a 404 when the job does not exist.
function mapStateToProps (state, { routeParams }) {
  return {
    job: firstWithSlug(routeParams.id)(state.jobs)
  };
}

export default connect(
  mapStateToProps
)(Job);
