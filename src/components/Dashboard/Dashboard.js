import React, { Component } from 'react'
import {
  Row,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Route, withRouter } from "react-router-dom";
import WorkspaceWrapper from '../WorkspaceWrapper';
import ToDoWrapper from '../ToDoWrapper';
import DocsWrapper from '../DocsWrapper';
import { connect } from 'react-redux';


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.tabClick = this.tabClick.bind(this);
    this.tabs = this.tabs.bind(this);
  }

  tabClick(path){
    const { history } = this.props;
    history.push(path);
  }

  tabs() {
    const { history } = this.props;
    const { pathname } = history.location;
    return (
      <Nav tabs>
        <NavItem>
          <NavLink
            className={`cursor-pointer ${ pathname === '/dashboard/workspace' ? 'active' : ''}`}
            onClick={() => this.tabClick('/dashboard/workspace')}
          >
            Workspace
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`cursor-pointer ${ pathname === '/dashboard/docs' ? 'active' : ''}`}
            onClick={() => this.tabClick('/dashboard/docs')}
          >
            Docs
          </NavLink>
        </NavItem>
      </Nav>
    )
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col className='border-right' sm={8} md={8} xs={12}>
            {this.tabs()}
            <Route exact path="/dashboard/workspace" component={WorkspaceWrapper} />
            <Route exact path="/dashboard/docs" component={DocsWrapper} />
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

export default withRouter(connect(mapStateToProps, actions)(Dashboard));