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

export function Grid ({children, fit}) {
  const gridClassNames = classNames(
    {
      [styles.grid]: true,
      [styles.withGutter]: true,
      [styles.fit]: fit
    }
  );
  return (
    <div className={gridClassNames}>
      {children}
    </div>
  );
}

Grid.propTypes = {
  children: React.PropTypes.node,
  fit: React.PropTypes.bool
};

export function Cell ({children, size}) {
  const cellClassNames = classNames(
    {
      [styles.cell]: true,
      [styles['size' + size + 'of12']]: !!size
    }
  );
  return (
    <div className={cellClassNames}>
      {children}
    </div>
  );
}

Cell.propTypes = {
  children: React.PropTypes.node,
  size: React.PropTypes.number
};
