/**
 * Grid Component
 *
 * The grid component is used to create a grid layout. It should contain one
 * or more Cell Components. The grid defaults to have gutters between Cells.
 *
 * Grid
 * @props: {
 *   fit: {Boolean}, make all cells fit into a single row
 * }
 *
 * Cell
 * @props: {
 *   size: {Number}, number of columns to span out of 12
 * }
 *
 */

/*eslint react/no-multi-comp:0*/
import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

export function Grid (props) {
  let fitClass;
  let gridClassNames;
  if (props.fit) {
    fitClass = styles.fit;
  }
  gridClassNames = classNames(
   styles.grid,
   styles.withGutter,
   fitClass
 );
  return (
    <div className={gridClassNames}>
      {props.children}
    </div>
  );
}

Grid.propTypes = {
  children: React.PropTypes.node,
  fit: React.PropTypes.bool
};

export function Cell (props) {
  let sizeClass;
  let cellClassNames;
  if (props.size) {
    sizeClass = styles['size' + props.size + 'of12'];
  }
  cellClassNames = classNames(styles.cell, sizeClass);
  return (
    <div className={cellClassNames}>
      {props.children}
    </div>
  );
}

Cell.propTypes = {
  children: React.PropTypes.node,
  size: React.PropTypes.number
};
