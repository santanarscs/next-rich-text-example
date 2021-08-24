import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'quill/dist/quill.snow.css'


const MODULES  = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]
}

export default function QuillTextEditor() {
  const [value, setValue] = useState('')
  return (
    <ReactQuill 
      theme="snow" 
      modules={MODULES}
      value={value} 
      onChange={setValue} />
  )
}