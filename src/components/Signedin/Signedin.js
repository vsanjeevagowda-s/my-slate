import React, { Component } from 'react'
import {
  Row,
  Col,
  Container
} from 'reactstrap';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Dashboard from '../Dashboard/Dashboard';


class Signedin extends Component {


  render() {
    return (
      <Switch>
        <Route exact path="/dashboard/workspace" component={Dashboard} />
        <Redirect to="/dashboard/workspace" />
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return state;
}

const actions = {}

export default withRouter(connect(mapStateToProps, actions)(Signedin));