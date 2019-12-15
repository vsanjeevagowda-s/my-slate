import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as signinActions from '../../actions/signin.actions';

class Interceptor extends Component {

  constructor(props) {
    super(props);
    console.log('this.props', this.props);
    console.log('Inside interceptor')
    const { signOut } = this.props;
    axios.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error) console.log('error ==>', error)
      const { status } = error.response
      if (status === 401) {
        console.log('status ===>', status)
        signOut();
      }
      return Promise.reject(error);
    });
  }

  render() {
    return (
      <React.Fragment />
    )
  }
}

const mapStateToProps = state => {
  return { state }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...signinActions }, dispatch)
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Interceptor));
