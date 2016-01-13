import React from 'react';

export default function Paragraph (props) {
  return <strong>{props.children}</strong>;
}

Paragraph.propTypes = {
  children: React.PropTypes.node.isRequired
};