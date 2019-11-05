import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { 
  Row,
  Col,
 } from 'reactstrap';
import EditorWrapper from './components/EditorWrapper';
import WorkspaceWrapper from './components/WorkspaceWrapper';


class App extends Component {
  render() {
    return (
      <Row>
        <Col className='border-right' sm={8} md={8} xs={12}>
        <WorkspaceWrapper />
        </Col>
        <Col>
        <EditorWrapper/>
        </Col>
      </Row>
    )
  }
};
export default App;
