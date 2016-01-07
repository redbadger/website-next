import React from 'react';

export default function Vimeo (props) {
  const source = "https://player.vimeo.com/video/" + props.id;
  return (
    <div>
      <iframe allowFullScreen frameBorder="0" height="281" src={source} width="500"></iframe>
    </div>
  );
}

Vimeo.propTypes = {
  id: React.PropTypes.string
};
