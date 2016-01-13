import JobOverview from './index';
import React from 'react';
import { render, hasProp, containsOne, findWithType } from '../../test-helper';
import { expect } from 'chai';

describe('Job Overview', () => {

  let result;

  before(() => {
    result = render(<JobOverview body="Body" href="TestLink" subtitle="SubTitle" title="Title" />);
  });

  it('renders the title with link', () => {
    const link = findWithType('a', result);

    expect(hasProp('href', 'TestLink')(link)).to.equal(true);
    expect(containsOne('Title', result)).to.equal(true);
  });

  it('renders the subtitle with strong', () => {
    const strong = findWithType('strong', result);

    expect(strong).to.exist;
    expect(containsOne('SubTitle', strong)).to.equal(true);
  });

  it('renders the body', () => {
    expect(containsOne('Body', result)).to.equal(true);
  });

});
