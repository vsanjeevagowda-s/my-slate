import React, { Component } from 'react';
import EditorWrapper from '../EditorWrapper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Value } from 'slate';
import {
  Spinner
} from 'reactstrap';
import * as workspaceActions from '../../actions/workspace.actions';
import initialValue from '../../reducers/value.json';
import VersionList from '../VersionList';


class WorkspaceWrapper extends Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.workspaceSyncTimeOutCtl = '';
  }

  componentDidMount() {
    const {
      workspace: {
        date
      },
      getWorkspaceRecordByDate
    } = this.props;
    getWorkspaceRecordByDate({ date });
  }

  onDateChange = ({ date }) => {
    const {
      workspaceContentChange,
      getWorkspaceRecordByDate
    } = this.props;
    workspaceContentChange({
      date,
      value: Value.fromJSON(initialValue)
    })
    getWorkspaceRecordByDate({ date })
  }

  onEditorChange({ value }) {
    const {
      workspace: {
        date
      },
      workspaceContentChange,
      syncWorkspaceContent
    } = this.props;
    workspaceContentChange({
      value,
      date,
    })
    clearTimeout(this.workspaceSyncTimeOutCtl);
    this.workspaceSyncTimeOutCtl = setTimeout(() => {
      const record = JSON.stringify(value.toJSON());
      syncWorkspaceContent({ date, record })
    }, 500);
  }

  render() {
    const {
      workspace: {
        date,
        value,
        isReadonly,
        workspaceDisplayFlag,
        workspaceRequestStatus,
        versionListModelFlag,
        versions,
        versionRequestStatus
      },
      getVersions,
      hideVersionListModelFn
    } = this.props;
    return (
      <div>
        {workspaceDisplayFlag && <EditorWrapper
          getVersions={getVersions}
          isReadonly={isReadonly}
          workspaceApiCallStatus={workspaceRequestStatus}
          type='workspace'
          onEditorChange={this.onEditorChange}
          onDateChange={this.onDateChange}
          date={date}
          editorHeightClass='workspace-editor-height'
          value={value} />}
        {!workspaceDisplayFlag && <div><Spinner style={{ width: '1rem', height: '1rem' }} type="grow" /></div>}
        {versionListModelFlag && <VersionList versions={versions}
          versionRequestStatus={versionRequestStatus}
          hideVersionListModelFn={hideVersionListModelFn} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { workspace } = state;
  return { workspace };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...workspaceActions }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceWrapper);