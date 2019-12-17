import {
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SAVE_TOKEN_STORE,
  SIGNOUT,
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
        token: action.resp.token
      }
    case SIGNIN_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        todoDisplayFlag: true,
      }
    case SAVE_TOKEN_STORE:
      return {
        ...state,
        token: localStorage.getItem('token')
      }
    case SIGNOUT:
        localStorage.removeItem('token')
      return {
        ...state,
        token: ''
      }
    default:
      return state;
  }
}

export default signin;