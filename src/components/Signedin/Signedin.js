import React, { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Dashboard from '../Dashboard';
import Interceptor from '../Interceptor';


class Signedin extends Component {


  render() {
    return (
      <React.Fragment>
        <Interceptor />
        <Switch>
          <Route exact path="/dashboard/workspace" component={Dashboard} />
          <Route exact path="/dashboard/docs" component={Dashboard} />
          <Redirect to="/dashboard/workspace" />
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state;
}

const actions = {}

export default withRouter(connect(mapStateToProps, actions)(Signedin));