import React, { Component } from 'react'
import EditorWrapper from '../EditorWrapper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workspaceActions from '../../actions/workspace.actions';

class ToDoWrapper extends Component {

  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange = ({ date }) => {
    const { onDateChange } = this.props;
    onDateChange(date)
  }

  onEditorChange({ value }) {
    const { date, workspaceContentChange } = this.props;
    workspaceContentChange({
      value,
      date,
    })
  }

  render() {
    const { date, value } = this.props;
    return (
      <div>
        {/* <EditorWrapper
          type='todo'
          onEditorChange={this.onEditorChange}
          onDateChange={this.onDateChange}
          date={date}
          value={value} /> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { date, value } = state.workspace;
  return { date, value };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...workspaceActions }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoWrapper);