import Link from 'next/link'
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from 'next/dist/client/router'


export default function index() {
  const router = useRouter()
  const [docs, setDocs] = useState([])
  useEffect(() => {
    const api = axios.create()
    api.get('http://localhost:3333/docs').then(response => {
      setDocs(response.data)
    })
  },[])
  function detail(id) {
    router.push(`/draft/${id}/detail`)
  }

  return (
    <div className="min-h-screen w-full flex justify-center bg-gradient-to-br from-yellow-400 to-pink-600">
      <div className="flex flex-col mt-10 p-4 m-10 w-full bg-white shadow-lg rounded-lg lg:w-2/3">
        <div className="flex justify-between mb-4">
          <h1 className="uppercase text-2xl text-gray-700">List of Docs</h1>
          <Link href="/draft/new">
            <a className="flex justify-center items-center py-2 px-4 rounded-sm bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:opacity-90"> New DOC</a>
          </Link>
        </div>
        <table className="w-full overflow-hidden rounded-sm my-4">
          <thead className="text-gray-700 ">
            <tr>
              <th className="text-left p-2 uppercase text-sm">ID</th>
              <th className="text-left p-2 uppercase text-sm">Title</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc, i) => (
              <tr key={doc.id} className={`${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}`}>
                <td onClick={() => detail(doc.id)} className="text-left p-2 cursor-pointer hover:text-blue-500">{doc.id}</td>
                <td className="text-left p-2 ">{doc.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}