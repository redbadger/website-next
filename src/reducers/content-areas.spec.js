import * as contentTypes from '../constants/content-types';
import contentAreasReducer from './content-areas';
import { expect } from 'chai';
import { updateContentArea } from '../actions/content-areas';

describe('Content areas reducer', () => {
  it('returns the initial state', () => {
    const state = contentAreasReducer(undefined, {});

    expect(state).to.have.length(4);
  });

  it('updates the specified content area', () => {
    const action = updateContentArea(1, '<p>I have been updated</p>');

    const state = contentAreasReducer(undefined, action);

    expect(state).to.include({
      id: 1,
      content: '<p>I have been updated</p>',
      type: contentTypes.HTML_CONTENT
    });
  });
});
