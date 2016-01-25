export const EDIT_CONTENT_AREA = 'EDIT_CONTENT_AREA';
export const UPDATE_CONTENT_AREA = 'UPDATE_CONTENT_AREA';
export const HTML_CONTENT = 'HTML_CONTENT';

export function editContentArea (id) {
  return {
    type: EDIT_CONTENT_AREA,
    id
  };
}

export function updateContentArea (id, content) {
  return {
    type: UPDATE_CONTENT_AREA,
    id,
    content
  };
}

// This is temporary and will be provided from a database somewhere in future
const initialState = {
  areas: ['1', '2', '3', '4'],
  areasById: {
    '1': {
      id: '1',
      type: HTML_CONTENT,
      content: `
        <h1>Join us</h1>
        <h3>Are we what you're looking for?*</h3>`
    },
    '2': {
      id: '2',
      type: HTML_CONTENT,
      content: `
        <p>We love doing fantastic work for our clients. We do this in integrated teams which are completely open with each other and our customers. It's all about communication and collaboration. It's about being innovative, being inspired, having fun and making magical things happen. Oh, and we're right in the heart of Tech City, Shoreditch so there's no shortage of great coffee shops...</p>
        <strong>* And vice versa</strong>`
    },
    '3': {
      id: '3',
      type: HTML_CONTENT,
      content: `<h2>Current Vacancies</h2>`
    },
    '4': {
      id: '4',
      type: HTML_CONTENT,
      content: `
      <h2>How to Apply</h2>
      <p>If you'd like more information, you want to apply, or you'd simply like to
      say 'hello', then please get in touch with your CV, Stackoverflow profile,
      Github, code, portfolio and anything else you think we might be interested
      in, at: <a href='mailto:jobs@red-badger.com'>jobs@red-badger.com</a>.`
    }
  },
  editingAreas: []
};

export function reducer (state = initialState, action) {
  switch (action.type) {
    // case EDIT_CONTENT_AREA:
    //   return state.map(area =>
    //       area.id === action.id
    //       ? {...area, })
    case UPDATE_CONTENT_AREA:
      const area = state.areasById[action.id];

      if (area == null) {
        return state;
      }

      return {
        ...state,
        areasById: {
          ...state.areasById,
          [action.id]: {
            ...area,
            content: action.content
          }
        }
      };

    default:
      return state;
  }
}
