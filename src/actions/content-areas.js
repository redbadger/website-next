import * as types from '../constants/action-types';

export function updateContentArea (id, content) {
  return {
    type: types.UPDATE_CONTENT_AREA,
    id,
    content
  };
}
