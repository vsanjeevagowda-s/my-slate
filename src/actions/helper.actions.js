export const headers = () => {
  return {
    headers : { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') }
  }
}