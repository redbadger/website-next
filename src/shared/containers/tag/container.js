import React from 'react';
import Container from '../../components/container';
import Section from '../../components/section';
import styles from './style.css';
import EventsList from '../../components/events-list';
import NewsList from '../../components/news-list';
import Helmet from 'react-helmet';

const TagContainer = ({ tag, allEvents, allNews }) => <div>
  <Helmet title={`Items tagged with "${tag}" | Red Badger`} />
  <Section>
    <Container>
      <h1 className={styles.h1}>
        <span className={styles.headingLeadLine}>
          Blogs, ideas, events, news tagged with
        </span>
        {tag}
      </h1>
      {allEvents &&
        <section>
          <h2>Events</h2>
          <EventsList events={allEvents} />
        </section>
      }
      {allNews &&
        <section>
          <h2>News</h2>
          <NewsList news={allNews} />
        </section>
      }
      {(!allEvents && !allNews) &&
        <p>
          {`We don't have anything related to "${tag}" at the moment`}
        </p>
      }
    </Container>
  </Section>
</div>;

TagContainer.propTypes = {
  tag: React.PropTypes.string.isRequired,
  allEvents: React.PropTypes.array,
  allNews: React.PropTypes.array,
};

export default TagContainer;
