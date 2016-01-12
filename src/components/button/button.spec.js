import Button from './index';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

describe('Button', () => {

  let renderer;
  let result;

  before(() => {
    renderer = TestUtils.createRenderer();
  });

  it('is a button if href is not passed in props', () => {
    renderer.render(<Button />);
    result = renderer.getRenderOutput();
    expect(result.type).to.equal('button');
  });

  it('is a link if href is passed in props', () => {
    renderer.render(<Button href="//red-badger.com" />);
    result = renderer.getRenderOutput();
    expect(result.type).to.equal('a');
  });
});
