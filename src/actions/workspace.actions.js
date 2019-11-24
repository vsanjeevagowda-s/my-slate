import axios from 'axios';

export const syncWorkspaceContent = body => async dispatch => {
  return axios.post(`https://jsonplaceholder.typicode.com/users`, body)
    .then(res => {
      debugger
    })
}