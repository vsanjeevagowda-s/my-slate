import {
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE
} from '../actions/signin.actions';

const initialState = {
  token: ''
}

const signin = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      localStorage.setItem('token', action.resp.token)
      return {
        ...state,
        token: ''
      }
    case SIGNIN_FAILURE:
        localStorage.removeItem('token');
      return {
        ...state,
        todoDisplayFlag: true,
      }
    default:
      return state;
  }
}

export default signin;