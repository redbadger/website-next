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
