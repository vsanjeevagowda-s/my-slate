import React, { Component } from 'react'
import EditorWrapper from '../EditorWrapper';

class ToDoWrapper extends Component {

  constructor(props){
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange(){
    console.log('sss')
  }

  render() {
    return (
      <div>
        <EditorWrapper type='todo' onEditorChange={this.onEditorChange}/>
      </div>
    )
  }
}
export default ToDoWrapper;