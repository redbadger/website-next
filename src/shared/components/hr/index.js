import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

export default function HR ({ color }) {
  const hrClass = classNames({
    [styles.hr]: true,
    [styles.red]: (color === 'red'),
    [styles.grey]: (color === 'grey')
  });

  return (
    <hr className={hrClass} />
  );
}

HR.propTypes = {
  color: React.PropTypes.oneOf(['red', 'grey'])
};
