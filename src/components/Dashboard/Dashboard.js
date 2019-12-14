import React, { Component } from 'react'
import {
  Row,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";


class Dashboard extends Component {
  render() {
    return (
      <Row >
        <Col>
        sample
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return state;
}

const actions = {}

export default connect(mapStateToProps, actions)(Dashboard);