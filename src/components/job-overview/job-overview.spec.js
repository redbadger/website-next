import JobOverview from './index';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Chai, { expect } from 'chai';
import jsxChai from 'jsx-chai';

Chai.use(jsxChai);

describe('Job Overview', () => {

  let result;

  before(() => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<JobOverview body="Body" href="TestLink" subTitle="SubTitle" title="Title" />);
    result = renderer.getRenderOutput();
  });

  it('renders the title with link', () => {
    expect(result.props.children[0]).to.include(<a href="TestLink">Title</a>);
  });

  it('renders the sub title', () => {
    expect(result.props.children[1]).to.include(<p>SubTitle</p>);
  });

  it('renders the body', () => {
    expect(result.props.children[2]).to.include(<p>Body</p>);
  });

});
