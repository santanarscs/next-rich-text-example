import { useState } from "react";
import { DraftTextEditor } from "../../components/DraftTextEditor";
import { Upload } from '../../components/Upload'
import * as XLSX from 'xlsx';
import axios from 'axios'

export default function create() {
  
  const [title, setTitle] = useState('')
  const [tableData, setTableData] = useState([])
  const [tableHeader, setTableHeader] = useState([])
  const [descriptionOfMethodology, setDescriptionOfMethodology] = useState(null)
  const [levelOfRisk, setLevelOfRisk] = useState(null)

  function onSubmit()  {
    const api = axios.create()

    api.post('http://localhost:3333/docs', {
      title,
      infrastructures: tableData,
      description_of_methodology: descriptionOfMethodology,
      level_of_risk: levelOfRisk
    }).then(() => console.log('ok'))
  }
  function handleUploadFile(f) {
    const reader = new FileReader();
    reader.onload = (evt) => { // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type:'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, {header:1});
        /* Update state */
        processData(data)
    };
    reader.readAsBinaryString(new Blob(f));
  }

  function processData(dataString) {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        if (headers && row.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                let d = row[j];
                if (d.length > 0) {
                    if (d[0] === '"')
                        d = d.substring(1, d.length - 1);
                    if (d[d.length - 1] === '"')
                        d = d.substring(d.length - 2, 1);
                }
                if (headers[j]) {
                    obj[headers[j]] = d;
                }
            }

            // remove the blank rows
            if (Object.values(obj).filter(x => x).length > 0) {
                list.push(obj);
            }
        }
    }

    // prepare columns list from headers
    const columns = headers.map(c => ({
        name: c,
        selector: c,
    }));

    setTableData(list)
    console.log(list)
    setTableHeader(columns)
  }


  return (
    <div className="min-h-screen w-full flex justify-center bg-gradient-to-br from-yellow-400 to-pink-600">
      <div className="flex flex-col mt-10 p-4 m-10 w-full bg-white shadow-lg rounded-lg lg:w-2/3">
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-xl text-gray-600 mb-2">Title</label>
          <input type="text" className="px-4 py-2 shadow-sm border border-gray-300" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        {tableHeader.length 
          ? (
            <table className="w-full overflow-hidden rounded-sm my-4">
              <thead className="text-gray-700 ">
                <tr>
                  {tableHeader.map(header => (<th className="text-left p-2 uppercase text-sm" key={header.selector}>{header.name}</th>))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}`}>
                    {tableHeader.map(header => (<td className="text-left p-2" key={header.selector}>{data[header.selector]}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          )
          : (
            <div className="flex flex-col mb-4">
              <label htmlFor="" className="text-xl text-gray-600 mb-2">Infrastructures</label>
              <Upload onUpload={handleUploadFile} />
            </div>
          )
        }
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-xl text-gray-600 mb-2">Description of Methodology</label>
          <DraftTextEditor handleEditorState={setDescriptionOfMethodology} />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-xl text-gray-600 mb-2">Levels of the risk to infrastructures </label>
          <DraftTextEditor handleEditorState={setLevelOfRisk} />
        </div>
        <button onClick={onSubmit} className=" py-4 w-full text-white uppercase bg-blue-500 hover:bg-blue-400 transition-colors">Save your data</button>
      </div>
    </div>
  )
}