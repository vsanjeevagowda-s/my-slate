import { Value } from 'slate';
import moment from 'moment';
import initialValue from './value.json';
import {
  TODO_LIST_SUCCESS,
  TODO_LIST_FAILURE,
  TODO_CONTENT_CHANGE,
  TODO_BY_DATE_SUCCESS,
  TODO_BY_DATE_FAILURE,
  TODO_LIST_API_CALL,
  SYNC_TODO_FAILURE,
  SYNC_TODO_SUCCESS
} from '../actions/todo.actions';

import { API_SUCCESS, API_FAILURE, API_PENDING } from '../actions/constants';

const initialState = {
  value: Value.fromJSON(initialValue),
  date: moment(new Date()).format("YYYY-MM-DD"),
  todoDisplayFlag: false,
  apiCall: API_SUCCESS
};

const todo = (state = initialState, action) => {
  switch (action.type) {
    case TODO_LIST_API_CALL:
      return {
        ...state,
        workspaceRequestStatus: API_PENDING
      }
    case TODO_LIST_SUCCESS:
      return {
        ...state,
        workspaceRequestStatus: API_SUCCESS
      }
    case TODO_LIST_FAILURE:
      return {
        ...state,
        workspaceRequestStatus: API_FAILURE
      }
    case TODO_CONTENT_CHANGE:
      const presentDate = moment(new Date()).format("YYYY-MM-DD")
      const date =  moment(action.date).format("YYYY-MM-DD");
      return {
        ...state,
        date: action.date,
        value: action.value,
        isReadonly: ( date < presentDate)
      }
    case TODO_BY_DATE_SUCCESS:
      return {
        ...state,
        todoDisplayFlag: true,
        date: action.resp.todo.date,
        value: Value.fromJSON(JSON.parse(action.resp.todo.record)),
        workspaceRequestStatus: API_SUCCESS
      }
    case TODO_BY_DATE_FAILURE:
      return {
        ...state,
        value: Value.fromJSON(initialValue),
        todoDisplayFlag: true,
        workspaceRequestStatus: API_FAILURE
      }
    case SYNC_TODO_FAILURE:
      return {
        ...state,
        workspaceRequestStatus: API_FAILURE
      }
    case SYNC_TODO_SUCCESS:
      return {
        ...state,
        workspaceRequestStatus: API_SUCCESS
      }
    default:
      return state;
  }
}

export default todo;