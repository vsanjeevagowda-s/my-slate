import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container,
  Alert
} from 'reactstrap';
import Socket from './lib/socket';
import * as helperActions from './actions/helper.actions';
import Main from './components/Main';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signinActions from './actions/signin.actions';
const socketClient = new Socket();

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

  componentDidMount() {
    const token = localStorage.getItem('token');
    const { saveTokenToStore, persistSocketInstance } = this.props;
    saveTokenToStore(token);
    persistSocketInstance(socketClient);
  }

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
  const { token } = state.signin;
  return { token };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...signinActions, ...helperActions }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
