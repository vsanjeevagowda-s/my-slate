
import {
  PERSIST_SOCKET_INSTANCE
} from '../actions/helper.actions';

const initialState = {
  socketClient: () => { console.log('Default function') }
}

const helper = (state = initialState, action) => {
  switch (action.type) {
    case PERSIST_SOCKET_INSTANCE:
      return {
        socketClient: action.socketClient
      }
    default:
      return state;
  }
}
export default helper;