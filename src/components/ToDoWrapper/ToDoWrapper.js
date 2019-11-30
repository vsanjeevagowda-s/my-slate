import React, { Component } from 'react'
import EditorWrapper from '../EditorWrapper';

class ToDoWrapper extends Component {

  constructor(props){
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange(){
  }

  render() {
    return (
      <div>
        {/* <EditorWrapper type='todo' onEditorChange={this.onEditorChange} onDateChange={this.onDateChange}
        date={date}
        value={value}/> */}
      </div>
    )
  }
}
export default ToDoWrapper;