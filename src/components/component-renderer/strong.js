import React from 'react';

export default class Paragraph extends React.Component {
  render () {
    return <strong>{this.props.children}</strong>;
  }
}

Paragraph.propTypes = {
  children: React.PropTypes.node.isRequired
};