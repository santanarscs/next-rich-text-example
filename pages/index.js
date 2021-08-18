
import { useState} from 'react'
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import dynamic from 'next/dynamic'; 
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
  const onEditorStateChange = (editorState) => { setEditorState(editorState) }
  // const onEditorStateChange = (editorState) => {
  //   setEditorState(convertToRaw(editorState.getCurrentContent()))
  // }
  const uploadImageCallBack = () => {console.log('upload image')}

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
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { 
              urlEnabled: true,
              uploadEnabled: true,
              uploadCallback: uploadImageCallBack, 
              previewImage: true,
              alt: { present: false, mandatory: false } 
            },
          }}
        />
      </div>
    </div>
  )
}
