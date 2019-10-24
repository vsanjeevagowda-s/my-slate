import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import './App.css';

// Create our initial value...
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: '',
          },
        ],
      },
    ],
  },
})

function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code className='code-block'>{props.children}</code>
    </pre>
  )
};

// Define a React component to render bold text with.
function BoldMark(props) {
  return <strong>{props.children}</strong>
}

// Define our app...
class App extends React.Component {
  // Set the initial value when the app is first constructed.
  state = {
    value: initialValue,
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    console.log('[value]', value)
    this.setState({ value })
  }

  // // Define a new handler which prints the key that was pressed.
  // onKeyDown = (event, editor, next) => {
  //   // Return with no changes if the keypress is not '&'
  //   if (event.key !== '&') return next()

  //   // Prevent the ampersand character from being inserted.
  //   event.preventDefault()
  //   // Change the value by inserting 'and' at the cursor's position.
  //   editor.insertText('and')
  // }

//   onKeyDown = (event, editor, next) => {
//     console.log('event.key', event.key)
//     // Return with no changes if it's not the "`" key with ctrl pressed.
    
//     if (event.key !== '`' || !event.altKey) return next()
//     debugger
//     // if (!event.ctrlKey) return next()

//     // Prevent the "`" from being inserted by default.
//     event.preventDefault()
// debugger
//     // Determine whether any of the currently selected blocks are code blocks.
//     const isCode = editor.value.blocks.some(block => block.type === 'code')
// debugger
//     // Toggle the block type depending on `isCode`.
//     editor.setBlocks(isCode ? 'paragraph' : 'code')
//   }

onKeyDown = (event, editor, next) => {
  if (!event.ctrlKey) return next()

  switch (event.key) {
    case 'b': {
      event.preventDefault()
      editor.toggleMark('bold')
      break
    }
    case '`': {
      const isCode = editor.value.blocks.some(block => block.type === 'code')
      event.preventDefault()
      editor.setBlocks(isCode ? 'paragraph' : 'code')
      break
    }
    default: {
      return next()
    }
  }
}

  // Render the editor.
  render() {
    const { value } = this.state;
    console.log('[initialValue]', value)
    return (
    <Editor 
    value={value} 
    onChange={this.onChange} 
    onKeyDown={this.onKeyDown}
    renderBlock={this.renderBlock} 
    renderMark={this.renderMark}/>)
  }

  renderBlock = (props, editor, next) => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />
      default:
        return next()
    }
  };

    // Add a `renderMark` method to render marks.
    renderMark = (props, editor, next) => {
      switch (props.mark.type) {
        case 'bold':
          return <BoldMark {...props} />
        default:
          return next()
      }
    }
}

export default App;
