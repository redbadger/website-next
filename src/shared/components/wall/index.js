import React from 'react';
import { Grid, Cell } from '../grid';

const { node, number } = React.PropTypes;

export default function Wall ({ cols, children }) {
  const elements = [];

  children.forEach((item, index) => {
    const field = index % cols;

    if (field >= elements.length) {
      elements[field] = [];
    }

    elements[field].push(item);
  });

  return (
    <Grid fit>
      {elements.map((column, index) => {
        return (<Cell key={index} size={Math.floor(12/cols)}>{column}</Cell>);
      })}
    </Grid>
  );
}

Wall.propTypes = {
  children: node.isRequired,
  cols: number.isRequired
};
