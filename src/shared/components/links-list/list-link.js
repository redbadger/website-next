// Displays list of links related to the item

import React from 'react';

import classNames from 'classnames';
import icons from '../icons/style.css';
import typography from '../../components/typography/style.css';
import styles from './style.css';

const ListLink = ({ link, direction }) =>
  <a
    className={classNames({
      [styles.fullDetailsLink]: true,
      [typography.aBold]: true,
    })}
    href={link.url}
    key={link.url}
    target={direction === 'external' ? '_blank' : null}
  >
    <span>{link.title}</span>
    <span className={classNames({
      [icons.sketchExternalLink]: direction === 'external',
      [icons.sketchArrowRight]: direction === 'internal',
      [styles.externalLinkIcon]: true,
    })}
    />
  </a>;

ListLink.propTypes = {
  link: React.PropTypes.object.isRequired,
  direction: React.PropTypes.oneOf(['external', 'internal']).isRequired,
};

export default ListLink;
