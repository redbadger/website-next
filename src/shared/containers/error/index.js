import React, { Component } from 'react';

export default class ErrorPage extends Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  render () {
    return (
      <h1>{this.props.children || 'Not found'}</h1>
    );
  }
}
