import React from 'react';
import styles from './styles.css';

export default function HtmlViewer (props) {
  return (
    <div
      className={styles.base}
      dangerouslySetInnerHTML={{__html: props.content}} /> // eslint-disable-line react/no-danger
    );
}

HtmlViewer.propTypes = {
  content: React.PropTypes.string.isRequired
};
