import React from 'react';
import Note from '../note';
import HtmlToReact from 'html-to-react';
import styles from './style.css';
import { Grid, Cell } from '../grid';

const htmlToReactParser = new HtmlToReact.Parser(React);

export default function Jobs (props) {
  const listings = props.jobs.map((job, index) => {
    const paragraphs = htmlToReactParser.parse('<div>' + job.description + '</div>');
    return (
      <Cell size={4} key={index}>
        <Note>
          <a className={styles.title} href="#">{job.title}<span className={styles.icon}></span></a>
          {paragraphs}
        </Note>
      </Cell>
    );
  });

  return (
    <div className="jobs">
      <Grid>
        {listings}
      </Grid>
    </div>
  );
}

Jobs.propTypes = {
  jobs: React.PropTypes.arrayOf(React.PropTypes.shape({
    description: React.PropTypes.string,
    title: React.PropTypes.string
  }))
};