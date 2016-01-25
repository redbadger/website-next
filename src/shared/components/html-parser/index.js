import React from 'react';
import HtmlToReact from 'html-to-react';
import styles from '../typography/style.css';

const { parse } = new HtmlToReact.Parser(React);

export default function HtmlParser ({children}) {
  const content = parse('<div class="' + styles.typography + '">' + children + '</div>');
  return content;
}

HtmlParser.propTypes = {
  children: React.PropTypes.string.isRequired
};
