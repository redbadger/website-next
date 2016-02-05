import React, { Component } from 'react';
import { Grid, Cell } from '../grid';

const { node, number } = React.PropTypes;

export default class Wall extends Component {
  static propTypes = {
    children: node.isRequired,
    cols: number.isRequired
  };

  render () {
    const elements = [];
    this.props.children.forEach((item, index) => {
      const field = index % this.props.cols;

      if (field >= elements.length) {
        elements[field] = [];
      }

      elements[field].push(item);
    });

    return (
      <Grid fit>
        {elements.map((column, index) => {
          return (<Cell key={index} size={Math.floor(12/this.props.cols)}>{column}</Cell>);
        })}
      </Grid>
    );
  }
}
