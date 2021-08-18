
import { useState} from 'react'
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import dynamic from 'next/dynamic'; 
import tablePlugin from 'draft-js-table-plugin'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: [],
    },
  ],
});




export default function Home() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(emptyContentState)
  )
  const [formattedData, setFormattedData] = useState('')
  const onEditorStateChange = (editorState) => { setEditorState(editorState) }
  // const onEditorStateChange = (editorState) => {
  //   setEditorState(convertToRaw(editorState.getCurrentContent()))
  // }
  const uploadImageCallBack = () => {console.log('upload image')}

  const handleSubmit = () => {
    setFormattedData(convertToRaw(editorState.getCurrentContent()))
  }

  return (
    <div className="bg-gray-300 min-h-screen flex flex-col items-center  justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-5 rounded-lg w-10/12 ">
        <h1 className="text-xl mb-4">Formulário</h1>
        <Editor 
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="toolbar-class"
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          plugins={[tablePlugin]}
          // toolbar={{
          //   options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
          //   inline: { inDropdown: true },
          //   list: { inDropdown: true },
          //   textAlign: { inDropdown: true },
          //   link: { inDropdown: true },
          //   history: { inDropdown: true },
          //   tablePlugin,
          //   image: { 
          //     urlEnabled: true,
          //     uploadEnabled: true,
          //     uploadCallback: uploadImageCallBack, 
          //     previewImage: true,
          //     alt: { present: false, mandatory: false } 
          //   },
          // }}
        />
        <button 
          onClick={handleSubmit}
          type="button" 
          className="px-8 py-2 bg-blue-500 text-white rounded-lg mt-2">
            Submit
        </button>
      </div>
      {!!formattedData && (
        <div className="w-10/12 bg-white p-4 mt-6 rounded-lg overflow-x-auto">
          <pre >
            {JSON.stringify(formattedData, undefined, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
