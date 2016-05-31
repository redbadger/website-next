import React from 'react';
import { render } from '../../test-helper.js';
import { expect } from 'chai';

import EventBody from './index';
import styles from './styles.css';

describe.only('EventBody component', () => {
  it('renders a text area', () => {
    const body = render(<EventBody />);
    expect(body.props.children[0]).to.deep.eq(
      <textarea className={styles.eventTextArea} name="body" type="text"></textarea>
    );
  });
});
