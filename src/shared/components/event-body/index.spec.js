import React from 'react';
import { render, findAllWithType } from '../../test-helper.js';
import { scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';
import { Editor } from 'draft-js';
import EventBody from './index';

describe.only('EventBody component', () => {
  it('renders a draft-js Editor and some styling buttons', () => {
    const body = render(<EventBody />);
    expect(findAllWithType(Editor, body).length).to.eq(1);
    expect(findAllWithType('button', body).length).to.eq(2);
  });
});
