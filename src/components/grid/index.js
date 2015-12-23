/*eslint react/no-multi-comp:0*/
import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

const gridClassNames = classNames(
  styles.grid,
  styles.withGutter,
  styles.fit
);

export class Grid extends React.Component {
  render () {
    return (
      <div className={gridClassNames}>
        {this.props.children}
      </div>
    );
  }
}

Grid.propTypes = {
  children: React.PropTypes.node
};

export class Cell extends React.Component {
  render () {
    return (
      <div className={styles.cell}>
        {this.props.children}
      </div>
    );
  }
}

Cell.propTypes = {
  children: React.PropTypes.node
};
