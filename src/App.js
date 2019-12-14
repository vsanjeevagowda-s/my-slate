import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container,
  Alert,
  Row,
  Col
} from 'reactstrap';
import Main from './components/Main';

const AlertWrapper = ({ message, error }) => {
  if (message) {
    return <Alert className='text-center mb-0' color='success'>{message}</Alert>
  } else if (error) {
    return <Alert className='text-center mb-0' color='danger'>{error}</Alert>
  } else {
    return '';
  }
}

class App extends Component {
  render() {
    const { error, message, token } = this.props;
    return (
      <React.Fragment>
        {(message || error) && <AlertWrapper message={message} error={error} />}
        <Container fluid>
          <Main token={token} />
        </Container>
      </React.Fragment>
    )
  }
};

const mapStateToProps = state => {

  const { message, error } = state.alert;
  const { token } = state.signIn;
  return { message, error, token };
}


export default App;
