import { Value } from 'slate';
import initialValue from './value.json';
import {
  WORKSPACE_LIST_SUCCESS,
  WORKSPACE_LIST_FAILURE,
  WORKSPACE_CONTENT_CHANGE,
  WORKSPACE_BY_DATE_SUCCESS,
  WORKSPACE_BY_DATE_FAILURE
} from '../actions/workspace.actions';
import moment from 'moment';

console.log({ initialValue })

const initialState = {
  value: Value.fromJSON(initialValue),
  date: moment(new Date()).format("YYYY-MM-DD"),
  workspaceDisplayFlag: false,
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
    case WORKSPACE_BY_DATE_SUCCESS:
      return {
        ...state,
        workspaceDisplayFlag: true,
        date: action.resp.workspace.date,
        value: Value.fromJSON(JSON.parse(action.resp.workspace.record)),
      }
    case WORKSPACE_BY_DATE_FAILURE:
      return {
        ...state,
        value: Value.fromJSON(initialValue),
        workspaceDisplayFlag: true,
      }
    default:
      return state;
  }
}

export default workspace;