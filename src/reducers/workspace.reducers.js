import { Value } from 'slate';
import initialValue from './value.json';
import {
  WORKSPACE_LIST_SUCCESS,
  WORKSPACE_LIST_FAILURE,
  WORKSPACE_CONTENT_CHANGE,
  WORKSPACE_BY_DATE_SUCCESS,
  WORKSPACE_BY_DATE_FAILURE,
  WORKSPACE_LIST_REQUEST,
  GET_VERSIONS_REQUEST,
  HIDE_VERSION_LIST_MODAL,
} from '../actions/workspace.actions';
import { API_SUCCESS, API_FAILURE, API_PENDING } from '../actions/constants';
import moment from 'moment';

console.log({ initialValue })

const initialState = {
  value: Value.fromJSON(initialValue),
  date: moment(new Date()).format("YYYY-MM-DD"),
  workspaceDisplayFlag: false,
  apiCall: API_SUCCESS,
  versions: [],
  versionListModelFlag: false,
  versionRequestStatus: API_SUCCESS
};

const workspace = (state = initialState, action) => {
  switch (action.type) {
    case WORKSPACE_LIST_REQUEST:
      return {
        ...state,
        workspaceRequestStatus: API_PENDING
      }
    case WORKSPACE_LIST_SUCCESS:
      return {
        ...state,
        versions: action.resp.data.workspace.versions,
        workspaceRequestStatus: API_SUCCESS
      }
    case WORKSPACE_LIST_FAILURE:
      return {
        ...state,
        workspaceRequestStatus: API_FAILURE
      }
    case WORKSPACE_CONTENT_CHANGE:
      const presentDate = moment(new Date()).format("YYYY-MM-DD")
      const date =  moment(action.date).format("YYYY-MM-DD");
      return {
        ...state,
        date: action.date,
        value: action.value,
        isReadonly: ( date < presentDate)
      }
    case WORKSPACE_BY_DATE_SUCCESS:
      return {
        ...state,
        workspaceDisplayFlag: true,
        date: action.resp.workspace.date,
        value: Value.fromJSON(JSON.parse(action.resp.workspace.record)),
        workspaceRequestStatus: API_SUCCESS
      }
    case WORKSPACE_BY_DATE_FAILURE:
      return {
        ...state,
        value: Value.fromJSON(initialValue),
        workspaceDisplayFlag: true,
        workspaceRequestStatus: API_FAILURE
      }
    case GET_VERSIONS_REQUEST:
      return {
        ...state,
        versionListModelFlag: true,
        versionRequestStatus: API_PENDING
      }
    case HIDE_VERSION_LIST_MODAL:
      return {
        ...state,
        versionListModelFlag: false,
      }
    default:
      return state;
  }
}

export default workspace;