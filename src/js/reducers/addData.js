/**
 * Created by chandransh on 21/12/16.
 */
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAILURE = 'LOAD_FAILURE';

const initialState = {
  data: [],
  loaded: false
};

export default function addData(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS:
    case LOAD_FAILURE: {
      return {
        ...state,
        loaded: true,
        data: action.data
      };
    }
    default:
      return state;
  }
}

export function loadSuccess(response) {
  return {
    type: LOAD_SUCCESS,
    data: response
  }
}

export function loadFailure(error) {
  console.log('Failed. ' + error);
  return {
    type: LOAD_FAILURE,
    data: []
  }
}