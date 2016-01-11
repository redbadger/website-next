import React from 'react';

export default class Link extends React.Component {
  render () {
    return <a href={this.props.href}>{this.props.children}</a>;
  }
}

Link.propTypes = {
  children: React.PropTypes.node.isRequired,
  href: React.PropTypes.string.isRequired
};