/*eslint react/no-multi-comp:0*/
import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

const gridClassNames = classNames(
  styles.grid,
  styles.withGutter,
  styles.fit
);

export function Grid ({children}) {
  return (
    <div className={gridClassNames}>
      {children}
    </div>
  );
}

Grid.propTypes = {
  children: React.PropTypes.node
};

export function Cell ({children}) {
  return (
    <div className={styles.cell}>
      {children}
    </div>
  );
}

Cell.propTypes = {
  children: React.PropTypes.node
};
