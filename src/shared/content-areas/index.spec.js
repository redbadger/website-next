import { expect } from 'chai';
import { updateContentArea, reducer, HTML_CONTENT, UPDATE_CONTENT_AREA } from './';

describe('updateContentArea action', () => {
  it('creates the correct properties', () => {
    const action = updateContentArea('1', '<p>test</p>');

    expect(action).to.eql({
      type: UPDATE_CONTENT_AREA,
      id: '1',
      content: '<p>test</p>'
    });
  });
});

describe('Content areas reducer', () => {
  it('returns the initial state', () => {
    const state = reducer(undefined, {});

    expect(state.areas).to.have.length(4);
    expect(state.areasById).to.have.all.keys(['1', '2', '3', '4']);
    expect(state.editingAreas).to.have.length(0);
  });

  it('updates the specified content area', () => {
    const action = updateContentArea('1', '<p>I have been updated</p>');

    const state = reducer(undefined, action);

    expect(state.areasById['1']).to.eql({
      id: '1',
      type: HTML_CONTENT,
      content: '<p>I have been updated</p>'
    });
  });
});
