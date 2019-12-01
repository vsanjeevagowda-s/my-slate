import { Value } from 'slate';
import initialValue from './value.json';
import {
  WORKSPACE_LIST_SUCCESS, WORKSPACE_LIST_FAILURE, WORKSPACE_CONTENT_CHANGE
} from '../actions/workspace.actions';

const initialState = {
  value: Value.fromJSON(initialValue),
  date: new Date()
};

const workspace = (state = initialState, action) => {
  switch (action.type) {
    case WORKSPACE_LIST_SUCCESS:
      return {
        ...state
      }
    case WORKSPACE_LIST_FAILURE:
      return {
        ...state
      }
    case WORKSPACE_CONTENT_CHANGE:
      return {
        ...state,
        date: action.date,
        value: action.value
      }
    default:
      return state;
  }
}

export default workspace;