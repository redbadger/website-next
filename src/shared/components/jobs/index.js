import React from 'react';
import Note from '../note';
import HtmlToReact from 'html-to-react';
import styles from './style.css';

const htmlToReactParser = new HtmlToReact.Parser(React);

export default function Jobs (props) {
  const listings = props.jobs.map((job, index) => {
    const paragraphs = htmlToReactParser.parse('<div>' + job.description + '</div>');
    return (
      <Note key={index}>
        <a className={styles.title} href="#">{job.title}<span className={styles.icon}></span></a>
        {paragraphs}
      </Note>
    );
  });

  return (
    <div className="jobs">
      {listings}
    </div>
  );
}

Jobs.propTypes = {
  jobs: React.PropTypes.arrayOf(React.PropTypes.shape({
    description: React.PropTypes.string,
    title: React.PropTypes.string
  }))
};