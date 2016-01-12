import React from 'react';

export default function JobOverview (props) {
  return (
    <div>
      <a href={props.href}>{props.title}</a>
      <p><strong>{props.subtitle}</strong></p>
      <p>{props.body}</p>
    </div>
  );
}

JobOverview.propTypes = {
  body: React.PropTypes.string.isRequired,
  href: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};
