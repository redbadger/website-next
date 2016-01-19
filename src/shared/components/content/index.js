import React from 'react';

export default function Content (props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

Content.propTypes = {
  children: React.PropTypes.node
};
