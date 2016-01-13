import JobOverview from './index';
import React from 'react';
import TestHelper from '../../test-helper';
import { expect } from 'chai';
import ShallowTestUtils from 'react-shallow-testutils';

describe('Job Overview', () => {

  let result;

  before(() => {
    result = TestHelper.render(<JobOverview body="Body" href="TestLink" subtitle="SubTitle" title="Title" />);
  });

  it('renders the title with link', () => {
    const element = ShallowTestUtils.findWithType(result, 'a');

    expect(element).to.exist;
    expect(element.props.href).to.equal('TestLink');
    expect(element.props.children[0]).to.equal('Title');
  });

  it('renders the subtitle with strong', () => {
    const element = ShallowTestUtils.findAllWithType(result, 'p')[0];
    const strong = ShallowTestUtils.findWithType(element, 'strong');

    expect(element).to.exist;
    expect(strong).to.exist;
    expect(strong.props.children).to.equal('SubTitle');
  });

  it('renders the body', () => {
    const element = ShallowTestUtils.findAllWithType(result, 'p')[1];

    expect(element).to.exist;
    expect(element.props.children).to.equal('Body');
  });

});
