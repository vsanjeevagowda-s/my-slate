import React, { Component } from 'react';
import EditorWrapper from '../EditorWrapper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Value } from 'slate';
import {
  Spinner,
  Row,
  Col
} from 'reactstrap';
import * as workspaceActions from '../../actions/workspace.actions';
import initialValue from '../../reducers/value.json'


class DocsWrapper extends Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.workspaceSyncTimeOutCtl = '';
  }

  componentDidMount() {
    const { date, getWorkspaceRecordByDate } = this.props;
    getWorkspaceRecordByDate({ date });
  }

  onDateChange = ({ date }) => {
    const {
      getWorkspaceRecordByDate, workspaceContentChange
    } = this.props;
    workspaceContentChange({
      date,
      value: Value.fromJSON(initialValue)
    })
    getWorkspaceRecordByDate({ date })
  }

  onEditorChange({ value }) {
    const { date, workspaceContentChange, syncWorkspaceContent } = this.props;
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
    const { date, value, workspaceDisplayFlag } = this.props;
    return (
      <Row>
        <Col>
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