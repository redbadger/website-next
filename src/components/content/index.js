import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

function addClassNames (element) {
  if (!styles[element.type]) {
    return element;
  }
  // attach special classes to passed elements;
  // ideally temporary until we know exactly how content will be edited;
  return React.cloneElement(element, {
    className: classNames(element.props.className, styles[element.type])
  });
}

export default function Content (props) {
  return (
    <div className={styles.content}>
      {React.Children.map(props.children, addClassNames)}
    </div>
  );
}

Content.propTypes = {
  children: React.PropTypes.node
};
