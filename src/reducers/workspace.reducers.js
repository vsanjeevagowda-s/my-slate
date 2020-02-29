import { Value } from 'slate';
import initialValue from './value.json';
import {
  WORKSPACE_LIST_SUCCESS,
  WORKSPACE_LIST_FAILURE,
  WORKSPACE_CONTENT_CHANGE,
  WORKSPACE_BY_DATE_SUCCESS,
  WORKSPACE_BY_DATE_FAILURE,
  WORKSPACE_LIST_API_CALL
} from '../actions/workspace.actions';
import { API_SUCCESS, API_FAILURE, API_PENDING } from '../actions/constants';
import moment from 'moment';

console.log({ initialValue })

const initialState = {
  value: Value.fromJSON(initialValue),
  date: moment(new Date()).format("YYYY-MM-DD"),
  workspaceDisplayFlag: false,
  apiCall: API_SUCCESS
};

const workspace = (state = initialState, action) => {
  switch (action.type) {
    case WORKSPACE_LIST_API_CALL:
      return {
        ...state,
        apiCallStatus: API_PENDING
      }
    case WORKSPACE_LIST_SUCCESS:
      return {
        ...state,
        apiCallStatus: API_SUCCESS
      }
    case WORKSPACE_LIST_FAILURE:
      return {
        ...state,
        apiCallStatus: API_FAILURE
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
        apiCallStatus: API_SUCCESS
      }
    case WORKSPACE_BY_DATE_FAILURE:
      return {
        ...state,
        value: Value.fromJSON(initialValue),
        workspaceDisplayFlag: true,
        apiCallStatus: API_FAILURE
      }
    default:
      return state;
  }
}

export default workspace;