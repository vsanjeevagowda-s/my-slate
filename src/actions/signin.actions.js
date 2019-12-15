import axios from 'axios';
const API_PATH = process.env.REACT_APP_API_PATH;
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

const signInSuccess = resp => {
  return {
    type: SIGNIN_SUCCESS,
    resp,
  }
}

const signInFailure = error => {
  return {
    type: SIGNIN_FAILURE,
    error,
  }
}

export const signin = body => async dispatch => {
  try {
    const resp = await axios.post(`${API_PATH}/signIn`, body);
    dispatch(signInSuccess(resp));
    const { token } = resp.data;
    return Promise.resolve({ token });
  } catch (error) {
    dispatch(signInFailure(error));
    return Promise.reject({ error });
  }
}