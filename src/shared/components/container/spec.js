import Container from './index';
import { expect } from 'chai';
import React from 'react';
import styles from './style.css';

describe('Container component', () => {
  it('renders children', () => {
    const markup = React.renderToStaticMarkup(
      <Container>Hello, world</Container>
    );

    expect(markup).to.contain('Hello, world');
  });

  it('adds an error background when provided', () => {
    const markup = React.renderToStaticMarkup(<Container background="error" />);

    expect(markup).to.contain(styles['error-background']);
  });
});
