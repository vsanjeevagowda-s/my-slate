import React, { Component } from 'react'
import EditorWrapper from '../EditorWrapper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Value } from 'slate';
import * as todoActions from '../../actions/todo.actions';
import initialValue from '../../reducers/value.json'

class ToDoWrapper extends Component {

  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.todoSyncTimeOutCtl = '';
  }

  componentDidMount() {
    const { date, getTodoRecordByDate } = this.props;
    getTodoRecordByDate({ date });
  }

  onDateChange = ({ date }) => {
    const { getTodoRecordByDate, todoContentChange } = this.props;
    todoContentChange({
      date,
      value: Value.fromJSON(initialValue)
    });
    getTodoRecordByDate({ date })
  }

  onEditorChange({ value }) {
    const { date, todoContentChange, syncTodoContent } = this.props;
    todoContentChange({
      value,
      date,
    })
    clearTimeout(this.todoSyncTimeOutCtl);
    this.todoSyncTimeOutCtl = setTimeout(() => {
      const record = JSON.stringify(value.toJSON());
      syncTodoContent({ date, record })
    }, 500);
  }

  render() {
    const { date, value, isReadonly, todoDisplayFlag, workspaceRequestStatus } = this.props;
    return (
      <div>
        {todoDisplayFlag && <EditorWrapper
          isReadonly={isReadonly}
          toDoApiCallStatus={workspaceRequestStatus}
          type='todo'
          onEditorChange={this.onEditorChange}
          onDateChange={this.onDateChange}
          date={date}
          editorHeightClass='todo-editor-height'
          value={value} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { date, value, isReadonly, todoDisplayFlag, workspaceRequestStatus } = state.todo;
  return { date, value, isReadonly, todoDisplayFlag, workspaceRequestStatus };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...todoActions }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoWrapper);