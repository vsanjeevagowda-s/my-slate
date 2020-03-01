import axios from 'axios';
import { headers } from './helper.actions';

const API_PATH = process.env.REACT_APP_API_PATH;

export const WORKSPACE_LIST_SUCCESS = 'WORKSPACE_LIST_SUCCESS';
export const WORKSPACE_LIST_FAILURE = 'WORKSPACE_LIST_FAILURE';
export const WORKSPACE_CONTENT_CHANGE = 'WORKSPACE_CONTENT_CHANGE';
export const WORKSPACE_BY_DATE_SUCCESS = 'WORKSPACE_BY_DATE_SUCCESS';
export const WORKSPACE_BY_DATE_FAILURE = 'WORKSPACE_BY_DATE_FAILURE';
export const WORKSPACE_LIST_REQUEST = 'WORKSPACE_LIST_REQUEST';
export const GET_VERSIONS_REQUEST = 'GET_VERSIONS_REQUEST';
export const GET_VERSIONS_REQUEST_SUCCESS = 'GET_VERSIONS_REQUEST_SUCCESS';
export const HIDE_VERSION_LIST_MODAL = 'HIDE_VERSION_LIST_MODAL';

const workspaceListSuccess = (resp) => {
  return {
    type: WORKSPACE_LIST_SUCCESS,
    resp,
  }
};

const workspaceListFailure = (error) => {
  return {
    type: WORKSPACE_LIST_FAILURE,
    error,
  }
};

export const listWorkspace = () => async dispatch => {
  try {
    dispatch({ type: WORKSPACE_LIST_REQUEST });
    const resp = await axios.get(`${API_PATH}/list`, headers());
    dispatch(workspaceListSuccess(resp));
    return Promise.resolve({ resp });
  } catch (error) {
    dispatch(workspaceListFailure({ error }));
    return Promise.reject({ error });
  }
};

export const syncWorkspaceContent = body => async dispatch => {
  try {
    dispatch({ type: WORKSPACE_LIST_REQUEST });
    const resp = await axios.put(`${API_PATH}/workspace`, body, headers());
    dispatch(workspaceListSuccess(resp));
    return Promise.resolve({ resp });
  } catch (error) {
    dispatch(workspaceListFailure({ error }));
    return Promise.reject({ error });
  }
};

export const workspaceContentChange = ({ date, value }) => {
  return {
    type: WORKSPACE_CONTENT_CHANGE,
    value,
    date,
  }
};

export const WorkspaceByDateSuccess = (resp) => {
  return {
    type: WORKSPACE_BY_DATE_SUCCESS,
    resp,
  }
}

export const WorkspaceByDateFilure = (error) => {
  return {
    type: WORKSPACE_BY_DATE_FAILURE,
    error,
  }
}

export const getWorkspaceRecordByDate = ({ date }) => async dispatch => {
  try {
    dispatch({ type: WORKSPACE_LIST_REQUEST });
    const resp = await axios.get(`${API_PATH}/workspace/${date}`, headers());
    const { workspace } = resp.data;
    dispatch(WorkspaceByDateSuccess({workspace}));
    return Promise.resolve({ workspace });
  } catch (error) {
    console.log(error )
    dispatch(WorkspaceByDateFilure({ error }));
    return Promise.reject({ error });
  }
}

export const getVersions = () => dispatch => {
  try {
    dispatch({ type: GET_VERSIONS_REQUEST });
    // const resp = await axios.get(`${API_PATH}/workspace`, headers());
  } catch (error) {
    console.log('showVersions', error)
  }
}

export const hideVersionListModelFn = () => dispatch => {
  try {
    dispatch({ type: HIDE_VERSION_LIST_MODAL });
  } catch (error) {
    console.log('hideVersions', error)
  }
}