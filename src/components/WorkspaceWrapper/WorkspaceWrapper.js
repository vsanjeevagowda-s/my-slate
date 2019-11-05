import React, { Component } from 'react';
import EditorWrapper from '../EditorWrapper';

class WorkspaceHeader extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}


class WorkspaceWrapper extends Component {
  render() {
    return (
      <div>
        <WorkspaceHeader />
        <EditorWrapper />
      </div>
    )
  }
}
export default WorkspaceWrapper;