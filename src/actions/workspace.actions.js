import axios from 'axios';
const { API_PATH } = process.env;

export const WORKSPACE_LIST_SUCCESS = 'WORKSPACE_LIST_SUCCESS';
export const WORKSPACE_LIST_FAILURE = 'WORKSPACE_LIST_FAILURE';
export const WORKSPACE_CONTENT_CHANGE = 'WORKSPACE_CONTENT_CHANGE';

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
    const resp = await axios.get(`${API_PATH}/list`);
    dispatch(workspaceListSuccess(resp));
    return Promise.resolve({ resp });
  } catch (error) {
    dispatch(workspaceListFailure({ error }));
    return Promise.reject({ error });
  }
};

export const syncWorkspaceContent = body => async dispatch => {
  try {
    const resp = await axios.post(`${API_PATH}/list`, body);
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
} 