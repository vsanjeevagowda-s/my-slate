import React, { Component } from 'react';
import EditorWrapper from '../EditorWrapper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workspaceActions from '../../actions/workspace.actions';

console.log({workspaceActions});

class WorkspaceHeader extends Component {
  render() {
    return (
      <div>
        Header
      </div>
    )
  }
}

class WorkspaceWrapper extends Component {
  constructor(props){
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange({ content }){
      const { syncWorkspaceContent } = this.props;
      syncWorkspaceContent(content)
  }

  render() {
    return (
      <div>
        <WorkspaceHeader />
        <EditorWrapper type='workspace' onEditorChange={this.onEditorChange}  />
      </div>
    )
  }
}

const mapStateToProps = state => {
return { state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...workspaceActions }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceWrapper);