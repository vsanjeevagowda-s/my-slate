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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as signinActions from '../../actions/signin.actions';


class Signin extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.state = {
      email: '',
      password: ''
    }
  }


  async signIn() {
    try {
      const { email, password } = this.state;
      const { signin, history } = this.props;
      await signin({ email, password });
      alert('Signin scccess');
    } catch (error) {
      alert('Signin Failure');
    }
  }

  onChangeHandler(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <Row className='h-100vh'>
        <Col sm={4} xs={12}></Col>
        <Col className='m-auto'>
          <div className='p-4 m-2 border shadow-sm rounded'>
            <Form>
              <h4 className='text-center'>Sign-In</h4>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" placeholder="email" onChange={(e) => this.onChangeHandler(e)} value={email} />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Password</Label>
                <Input type="password" name="password" onChange={(e) => this.onChangeHandler(e)} value={password} />
              </FormGroup>
              <Button onClick={this.signIn} color="primary" block>Signin</Button>
            </Form>
          </div>
        </Col>
        <Col sm={4} xs={12}></Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  const { date, value, todoDisplayFlag } = state.todo;
  return { date, value, todoDisplayFlag };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...signinActions }, dispatch)
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
