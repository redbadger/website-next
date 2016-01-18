import { expect } from 'chai';
import { updateContentArea } from './content-areas';
import * as actionTypes from '../constants/action-types';

describe('updateContentArea action', () => {
  it('creates the correct properties', () => {
    const action = updateContentArea(1, '<p>test</p>');

    expect(action).to.eql({
      type: actionTypes.UPDATE_CONTENT_AREA,
      id: 1,
      content: '<p>test</p>'
    });
  });
});
