import axios from 'axios';
const API_PATH = process.env.REACT_APP_API_PATH;
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

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
    const { token } = resp.data;
    dispatch(signInSuccess({ token }));
    return Promise.resolve({ token });
  } catch (error) {
    dispatch(signInFailure(error));
    return Promise.reject({ error });
  }
}