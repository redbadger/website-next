import Root from './index';
import { expect } from 'chai';
import React from 'react';
import { render, containsOne } from '../../test-helper';
import styles from './style.css';

describe('Root component', () => {
  it('renders children', () => {
    const markup = render(
      <Root>Hello, world</Root>
    );

    expect(containsOne('Hello, world', markup)).to.equal(true);
  });

  it('adds an error background when provided', () => {
    const markup = render(<Root background="error" />);

    expect(markup.props.className).to.contain(styles['error-background']);
  });
});
