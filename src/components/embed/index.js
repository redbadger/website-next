import React from 'react';

export default function Embed (props) {
  return (
    <div dangerouslySetInnerHTML={{ __html: props.src }}></div>
  );
}

Embed.propTypes = {
  src: React.PropTypes.string
};
