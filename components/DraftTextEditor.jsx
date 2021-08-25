import dynamic from 'next/dynamic'; 
import { useState } from 'react';
import { EditorState } from 'draft-js'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export function DraftTextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    console.log(editorState)
  }
  return (
    <div>
      <Editor 
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="justify-center"
        // toolbarClassName="flex sticky top-0 z-50 justify-center border border-gray-400"
        editorClassName="px-8 py-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border max-h-96 border border-gray-300"
      />
    </div>
  )
}