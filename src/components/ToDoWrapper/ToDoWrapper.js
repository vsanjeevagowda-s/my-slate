import React, { Component } from 'react'
import EditorWrapper from '../EditorWrapper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todo.actions';

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
    const { date, todoContentChange } = this.props;
    todoContentChange({
      value,
      date,
    })
  }

  render() {
    const { date, value, todoDisplayFlag } = this.props;
    return (
      <div>
        {todoDisplayFlag && <EditorWrapper
          type='todo'
          onEditorChange={this.onEditorChange}
          onDateChange={this.onDateChange}
          date={date}
          value={value} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { date, value, todoDisplayFlag } = state.todo;
  return { date, value, todoDisplayFlag };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...todoActions }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoWrapper);