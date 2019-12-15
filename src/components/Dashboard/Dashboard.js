import React, { Component } from 'react'
import {
  Row,
  Col,
  Container
} from 'reactstrap';
import { Switch, Route } from "react-router-dom";
import WorkspaceWrapper from '../WorkspaceWrapper';
import ToDoWrapper from '../ToDoWrapper';
import { connect } from 'react-redux';


class Dashboard extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col className='border-right' sm={8} md={8} xs={12}>
            <Route exact path="/dashboard/workspace" component={WorkspaceWrapper} />
          </Col>
          <Col>
            <ToDoWrapper />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return state;
}

const actions = {}

export default connect(mapStateToProps, actions)(Dashboard);