import JobOverview from './index';
import React from 'react';
import { render, hasProp, containsOne, findWithType } from '../../test-helper';
import { expect } from 'chai';

describe('Job Overview', () => {

  let result;

  before(() => {
    result = render(<JobOverview body="<p>First paragraph</p><p>Second one</p>" href="TestLink" title="Title" />);
  });

  it('renders the title with link', () => {
    const link = findWithType('a', result);

    expect(hasProp('href', 'TestLink')(link)).to.equal(true);
    expect(containsOne('Title', result)).to.equal(true);
  });

  it('renders the body', () => {
    expect(containsOne('First paragraph', result)).to.equal(true);
    expect(containsOne('Second one', result)).to.equal(true);
  });

});
