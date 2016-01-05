import Button from './index';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Chai from 'chai';

const expect = Chai.expect;

describe('Button', () => {
  it('is a button if href is not passed in props', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Button />);
    const rendered = renderer.getRenderOutput();
    expect(rendered.type).to.equal('button');
  });

  it('is a link if href is passed in props', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Button href="//red-badger.com" />);
    const rendered = renderer.getRenderOutput();
    expect(rendered.type).to.equal('a');
  });
});
