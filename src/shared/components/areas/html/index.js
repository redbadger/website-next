import React, { Component, PropTypes } from 'react';
import HtmlViewer from './viewer';

export default class HtmlArea extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired
  };
  render () {
    if (this.props.isEditing) {
      return <HtmlViewer content={this.props.content} />;
    } else {
      return <HtmlViewer content={this.props.content} />;
    }
  }
}
