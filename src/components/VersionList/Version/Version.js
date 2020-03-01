import React from 'react';
import { Value } from 'slate';

import EditorWrapper from '../../EditorWrapper';

function Version({ item }) {
  return (
    <div>
      {item.version}
      <EditorWrapper
        isReadonly={true}
        type="version"
        onEditorChange={() => { }}
        onDateChange={() => { }}
        date={item.date}
        editorHeightClass='workspace-editor-height'
        value={Value.fromJSON(JSON.parse(item.record))} />
    </div>
  );
}

export default Version;