import QuillTextEditor from '../components/QuillTextEditor'
export default function Quill() {
  return (
    <div className="min-h-screen flex justify-center">
      <form className="mt-6">
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-2xl text-gray-700 mb-1">Title</label>
          <input type="text" className="px-4 py-2 border border-gray-300 shadow-sm "/>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-2xl text-gray-700 mb-1">Content</label>
          <QuillTextEditor  />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white uppercase tracking-wide hover:bg-blue-500 transition-colors">submit</button>
      </form>
      {/* <div className="flex flex-col mt-6">
        <h1 className="text-2xl mb-2 text-gray-700">Content of note</h1>
      </div> */}
    </div>
  )
}