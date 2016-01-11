import React from 'react';
import * as textStyles from '../utils/text.css';

export default class Paragraph extends React.Component {
  render () {
    return <p className={textStyles.center}>{this.props.children}</p>;
  }
}

Paragraph.propTypes = {
  children: React.PropTypes.node.isRequired
};