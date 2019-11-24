import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import WorkspaceWrapper from './components/WorkspaceWrapper';
import ToDoWrapper from './components/ToDoWrapper';


class App extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col className='border-right' sm={8} md={8} xs={12}>
            <WorkspaceWrapper />
          </Col>
          <Col>
            <ToDoWrapper />
          </Col>
        </Row>
      </Container>
    )
  }
};
export default App;
