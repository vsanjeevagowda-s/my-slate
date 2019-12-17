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
import FolderTree from 'react-folder-tree';
import * as workspaceActions from '../../actions/workspace.actions';
import initialValue from '../../reducers/value.json'


const testData = {
  "id": 1,
  "filename": "All Categories",
  "children": [
    {
      "id": 2,
      "filename": "For Sale",
      "children": [
        {
          "id": 3,
          "filename": "Audio & Stereo",
          "children": [
    {
      "id": 4,
      "filename": "For Sale",
      "children": [
        {
          "id": 5,
          "filename": "Audio & Stereo",
        },
        {
          "id": 6,
          "filename": "Baby & Kids Stuff",
        },
        {
          "id": 7,
          "filename": "Music, Films, Books & Games",
        }
      ]
    },
    {
      "id": 8,
      "filename": "Motors",
      "children": [
        {
          "id": 9,
          "filename": "Car Parts & Accessories",
        },
        {
          "id": 10,
          "filename": "Cars",
        },
        {
          "id": 11,
          "filename": "Motorbike Parts & Accessories",
        }
      ]
    },
    {
      "id": 12,
      "filename": "Jobs",
      "children": [
        {
          "id": 13,
          "filename": "Accountancy",
        },
        {
          "id": 14,
          "filename": "Financial Services & Insurance",
        },
        {
          "id": 15,
          "filename": "Bar Staff & Management", 
        }
      ]
    }
  ]
        },
        {
          "id": 16,
          "filename": "Baby & Kids Stuff",
        },
        {
          "id": 17,
          "filename": "Music, Films, Books & Games",
        }
      ]
    },
    {
      "id": 18,
      "filename": "Motors",
      "children": [
        {
          "id": 19,
          "filename": "Car Parts & Accessories",
        },
        {
          "id": 20,
          "filename": "Cars",
        },
        {
          "id": 21,
          "filename": "Motorbike Parts & Accessories",
        }
      ]
    },
    {
      "id": 22,
      "filename": "Jobs",
      "children": [
        {
          "id": 23,
          "filename": "Accountancy",
        },
        {
          "id": 24,
          "filename": "Financial Services & Insurance",
        },
        {
          "id": 25,
          "filename": "Bar Staff & Management", 
        }
      ]
    }
  ]
}


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
              type='docs'
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