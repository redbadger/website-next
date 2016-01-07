import React from 'react';

export default function YouTube (props) {
  const source = "https://www.youtube.com/embed/" + props.id;
  return (
    <div>
      <iframe allowFullScreen frameBorder="0" height="315" src={source} width="560"></iframe>
    </div>
  );
}

YouTube.propTypes = {
  id: React.PropTypes.string
};
