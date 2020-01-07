import React, { Component } from 'react';
import EditorWrapper from '../EditorWrapper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Value } from 'slate';
import {
  Spinner
} from 'reactstrap';
import moment from 'moment';
import * as workspaceActions from '../../actions/workspace.actions';
import initialValue from '../../reducers/value.json'


class WorkspaceWrapper extends Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.workspaceSyncTimeOutCtl = '';
  }

  componentDidMount() {
    console.log('Inside the [WorkspaceWrapper.js] [componentDidMount]')
    const { date, getWorkspaceRecordByDate, socketClient } = this.props;
    getWorkspaceRecordByDate({ date });
    socketClient.registerWorkspaceUpdateEvent((notifyDate) => {
      const { date:currentDate } = this.props;
      console.log('notifyDate =>', notifyDate);
      console.log('currentDate =>', currentDate);
      if (date === notifyDate) {
        getWorkspaceRecordByDate({ date })
      }
    })
  }

  onDateChange = ({ date }) => {
    const {
      getWorkspaceRecordByDate, workspaceContentChange
      , socketClient } = this.props;
    workspaceContentChange({
      date: moment(date).format('YYYY-MM-DD'),
      value: Value.fromJSON(initialValue)
    })
    getWorkspaceRecordByDate({ date })
      .then(() => {
        socketClient.workspaceChangeEvent(date)
      })
  }

  onEditorChange({ value }) {
    const { date, workspaceContentChange, syncWorkspaceContent, socketClient } = this.props;
    workspaceContentChange({
      value,
      date: moment(date).format('YYYY-MM-DD'),
    })
    clearTimeout(this.workspaceSyncTimeOutCtl);
    this.workspaceSyncTimeOutCtl = setTimeout(() => {
      const record = JSON.stringify(value.toJSON());
      syncWorkspaceContent({ date: moment(date).format('YYYY-MM-DD'), record })
        .then(() => {
          socketClient.workspaceChangeEvent(date)
        })
    }, 500);
  }

  render() {
    const { date, value, workspaceDisplayFlag } = this.props;
    return (
      <div>
        {workspaceDisplayFlag && <EditorWrapper
          type='workspace'
          onEditorChange={this.onEditorChange}
          onDateChange={this.onDateChange}
          date={date}
          editorHeightClass='workspace-editor-height'
          value={value} />}
        {!workspaceDisplayFlag && <div><Spinner style={{ width: '1rem', height: '1rem' }} type="grow" /></div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { date, value, workspaceDisplayFlag } = state.workspace;
  const { socketClient } = state.helper;
  return { date, value, workspaceDisplayFlag, socketClient };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...workspaceActions }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceWrapper);