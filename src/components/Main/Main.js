import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import WorkspaceWrapper from '../WorkspaceWrapper';
import ToDoWrapper from '../ToDoWrapper';
import Signin from '../Signin';
import Dashboard from '../Dashboard';

class Main extends Component {

  shouldComponentUpdate(nextProps, nextState){
    const { token } = this.props;
    const { token: ntoken } = nextProps;
    
    if(token !== ntoken) return true;
    return false;
  }

  render() {
    const { token } = this.props;
    
    return (
      <Switch>
        <Route exact path="/" component={Signin} />
        {/* <Route exact path="/workspace" component={WorkspaceWrapper} /> */}
        {/* <Route exact path="/todo" component={ToDoWrapper} /> */}
        {token && <Dashboard />}
      </Switch>
    )
  }
}

export default Main;