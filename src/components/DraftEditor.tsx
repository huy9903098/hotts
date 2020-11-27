import { Editor, EditorState } from "draft-js";
import React from 'react';

interface DraftEditorProps {

}

export const DraftEditor: React.FC<DraftEditorProps> = ({}) => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);

  function focusEditor() {
    (editor as any).current.focus();
  }

  React.useEffect(() => {
    focusEditor();
  }, []);
  return (
    <Editor
      ref={editor}
      editorState={editorState}
      onChange={setEditorState}
    />
  );
}