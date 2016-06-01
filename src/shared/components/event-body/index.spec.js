import React from 'react';
import { render, findAllWithType } from '../../test-helper.js';
import { expect } from 'chai';
import { Editor } from 'draft-js';
import EventBody from './index';

describe('EventBody component', () => {
  it('renders a draft-js Editor and some styling buttons', () => {
    const props = {
      editorState: {},
      onChange: () => ({}),
      onStyleChange: () => ({}),
      options: ['bold', 'italic']
    };
    
    const body = render(<EventBody {...props} />);
    expect(findAllWithType(Editor, body).length).to.eq(1);

    const buttons = findAllWithType('button', body);
    expect(buttons.length).to.eq(2);
    expect(buttons[0].props.children).to.eq('Bold');
  });
});
