import React from 'react';
import Note from '../note';
import HtmlParser from '../html-parser';
import styles from './style.css';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Wall from '../wall';

export function Jobs ({jobs}) {
  const listings = jobs.map((job, index) => {
    return (
      <Note key={index}>
        <Link className={styles.title} to={'/about-us/join-us/' + job.slug}>{job.title}<span className={styles.icon}></span></Link>
        <HtmlParser>{job.description}</HtmlParser>
      </Note>
    );
  });

  return (
    <div className="jobs">
      <Wall cols={3}>
        {listings}
      </Wall>
    </div>
  );
}

Jobs.propTypes = {
  jobs: React.PropTypes.arrayOf(React.PropTypes.shape({
    description: React.PropTypes.string,
    title: React.PropTypes.string
  }))
};

export default connect((state) => {
  return {
    jobs: state.jobs
  };
})(Jobs);
