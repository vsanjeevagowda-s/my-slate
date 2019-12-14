import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

export default class Signin extends Component {
  render() {
    return (
      <Row className='h-100vh'>
        <Col sm={4} xs={12}></Col>
        <Col className='m-auto'>
          <div className='p-4 m-2 border shadow-sm rounded'>
            <h4 className='text-center'>Sign-In</h4>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" placeholder="email" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Password</Label>
              <Input type="password" name="email" />
            </FormGroup>
            <Button color="primary" block>Signin</Button>
          </div>
        </Col>
        <Col sm={4} xs={12}></Col>
      </Row>
    )
  }
}
