import React from 'react';
import JobOverview from '../job-overview';

export default function Jobs (props) {
  const listings = props.jobs.map((job, index) => {
    return (<JobOverview body={job.description} href="#" key={index} title={job.title} />);
  });

  return (
    <div>
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