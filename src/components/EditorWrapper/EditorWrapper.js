import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Editor } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import { Row, Col, Button, Input } from 'reactstrap';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');
const DEFAULT_NODE = 'paragraph';

class EditorWrapper extends Component {
  constructor(props){
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onDateChange = ({date}) => {
    const { onDateChange } = this.props;
    onDateChange({date})
  }

  onChange = ({ value }) => {
    const { onEditorChange } = this.props;
    onEditorChange && onEditorChange({value});
  };

  onKeyDown = (event, editor, next) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return next()
    }

    event.preventDefault()
    editor.toggleMark(mark)
  }

  ref = editor => {
    this.editor = editor
  };

  hasMark = type => {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type === type)
  }

  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol className='ml-4' {...attributes}>{children}</ol>
      default:
        return next()
    }
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  };

  renderMarkButton = (type, className) => {
    const isActive = this.hasMark(type)

    return (
      <Button
        className='cursor-pointer border-0'
        active={isActive}
        size='sm'
        outline color='secondary'
        onMouseDown={event => this.onClickMark(event, type)}
      >
        {/* <Icon>{icon}</Icon> */}
        <i className={className} />
      </Button>
    )
  };

  renderBlockButton = (type, className) => {
    let isActive = this.hasBlock(type)

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value: { document, blocks } } = this.props

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
      <Button
        className='cursor-pointer border-0'
        active={isActive}
        size='sm'
        outline color='secondary'
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <i className={className} />
      </Button>
    )
  };

  onClickMark = (event, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
  }

  hasBlock = type => {
    const { value } = this.props
    return value.blocks.some(node => node.type === type)
  }

  onClickBlock = (event, type) => {
    event.preventDefault()

    const { editor } = this
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }

  render() {
    const { type, value, date } = this.props;
    return (
      <Row className='p-2'>
        <Col xs={12} sm={12} md={12}>
          <Row className='border-bottom pb-2'>
            <Col>
              {this.renderMarkButton('bold', 'fa fa-bold')}
              {this.renderMarkButton('italic', 'fa fa-italic')}
              {this.renderMarkButton('underlined', 'fa fa-underline')}
              {this.renderMarkButton('code', 'fa fa-code')}
              {this.renderBlockButton('heading-one', 'fa fa-heading1')}
              {this.renderBlockButton('heading-two', 'fa fa-heading2')}
              {this.renderBlockButton('numbered-list', 'fa fa-list-ol')}
            </Col>
            {(type === 'workspace') && <Col xs={12} sm={4} md={4}>
              <Input type='date' name='date' value={date} onChange={(e) => this.onDateChange({date: e.target.value})}/>
            </Col>}
            {(type === 'todo') && <Col xs={12} sm={12} md={12}>
            <Input type='date' name='date' value={date} onChange={(e) => this.onDateChange({date: e.target.value})} />
            </Col>}
          </Row>
        </Col>
        <Col>
          <Editor
            spellCheck
            autoFocus
            placeholder="Enter some rich text..."
            ref={this.ref}
            value={value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderBlock={this.renderBlock}
            renderMark={this.renderMark}
          />
        </Col>
      </Row>
    )
  };

}
export default EditorWrapper;