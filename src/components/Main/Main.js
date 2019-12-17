import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import Signin from '../Signin';
import Signedin from '../Signedin';

class Main extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { token } = this.props;
    const { token: ntoken } = nextProps;

    if (token !== ntoken) return true;
    return false;
  }

  render() {
    const { token } = this.props;

    return (
      <Switch>
        {!token && <Route exact path="/" component={Signin} />}
        {token && <Signedin />}
        <Route component={Signin} />
      </Switch>
    )
  }
}

export default Main;