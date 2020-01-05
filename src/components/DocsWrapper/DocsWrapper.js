import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EditorWrapper from '../EditorWrapper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import  '../../../node_modules/rc-tree/assets/index.css';
import Tooltip from 'rc-tooltip';
import Tree, { TreeNode } from 'rc-tree';
import { Value } from 'slate';
import {
  Row,
  Col
} from 'reactstrap';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import * as workspaceActions from '../../actions/workspace.actions';
import initialValue from '../../reducers/value.json';

const treeData = [
  {
    key: '0-0',
    title: 'parent 1',
    children: [
      { key: '0-0-0', title: 'parent 1-1' },
      { key: '0-0-1', title: 'parent 1-1' }
    ]
  },
];

class DocsWrapper extends Component {

  constructor(props) {
    super(props);
    this.onRightClick = this.onRightClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    const { keys } = props;
    this.state = {
      defaultSelectedKeys: [],
      defaultCheckedKeys: [],
    };
    this.treeRef = React.createRef();
  }

  optionSelected(type){
    console.log('optionSelected:type',type );
  }

  renderCm(info) {
    if (this.contextMenu) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      this.contextMenu = null;
    }
    this.contextMenu = (
      // <Tooltip
      //   trigger="click"
      //   placement="bottomRight"
      //   prefixCls="rc-tree-contextmenu"
      //   defaultVisible
      //   overlay={<h4>{info.node.props.title}</h4>}
      // >
      //   <span />
      // </Tooltip>
      <div className='bg-light p-2'>
        <ul>
          <li onClick={() => this.optionSelected('new_folder')}>New Folder</li>
          <li onClick={() => this.optionSelected('new_file')}>New File</li>
        </ul>
      </div>
    );

    const container = this.getContainer();
    Object.assign(this.cmContainer.style, {
      position: 'absolute',
      left: `${info.event.pageX}px`,
      top: `${info.event.pageY}px`,
    });

    ReactDOM.render(this.contextMenu, container);
  };

  getContainer() {
    if (!this.cmContainer) {
      this.cmContainer = document.createElement('div');
      document.body.appendChild(this.cmContainer);
    }
    return this.cmContainer;
  }

  onSelect = selectedKeys => {
    this.setState({ selectedKeys });
  };

  onRightClick = info => {
    console.log('right click', info);
    this.setState({ selectedKeys: [info.node.props.eventKey] });
    this.renderCm(info);
  };


  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
  };

  // onSelect = (selectedKeys, info) => {
  //   console.log('selected', selectedKeys, info);
  //   this.selKey = info.node.props.eventKey;
  // };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  onEdit = () => {
    setTimeout(() => {
      console.log('current key: ', this.selKey);
    }, 0);
  };

  onDel = e => {
    if (!window.confirm('sure to delete?')) {
      return;
    }
    e.stopPropagation();
  };

  setTreeRef = tree => {
    this.tree = tree;
  };


  render() {
    const { date, value, workspaceDisplayFlag } = this.props;
    return (
      <Row>
        <Col sm={3} md={3}>
          <Tree
            onRightClick={this.onRightClick}
            className="myCls"
            showLine
            checkable
            selectable={false}
            defaultExpandAll
            onExpand={this.onExpand}
            defaultSelectedKeys={this.state.defaultSelectedKeys}
            defaultCheckedKeys={this.state.defaultCheckedKeys}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
            treeData={treeData}
          />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  const { date, value, workspaceDisplayFlag } = state.workspace;
  return { date, value, workspaceDisplayFlag };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...workspaceActions }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(DocsWrapper);