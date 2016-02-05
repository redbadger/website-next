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
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './style.css';

export class Grid extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    fit: React.PropTypes.bool
  };

  render () {
    const gridClassNames = classNames(
      {
        [styles.grid]: true,
        [styles.withGutter]: true,
        [styles.fit]: this.props.fit
      }
    );

    return (
      <div className={gridClassNames}>
        {this.props.children}
      </div>
    );
  }
}

export Cell from './cell.js';
