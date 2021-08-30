import { useState } from "react"
import { Upload } from '../../components/Upload'
import { DraftTextEditor } from '../../components/DraftTextEditor'
function FirstStep() {
  return (
    <div>
      <h2 className="text-xl mb-2">Select data for your report</h2>
      <Upload  />
    </div>
  )
}

function SecondStep() {
  const [editorState, setEditorState] = useState()
  return (
    <div>
      <h1 className="text-xl mb-2">Description of methodology</h1>
      <DraftTextEditor handleEditorState={() => console.log('lkjd')} />
    </div>
  )
}

function ThirdStep() {
  return (
    <div>
      <h1 className="text-xl mb-2">Level of risk</h1>
      <DraftTextEditor handleEditorState={() => console.log('lkjd')} />
    </div>
  )
}



export default function index() {
  const [stepState, setStepState] = useState(0)
  const steps = [
    'Import your data',
    'Description of methodology',
    'Level of risk'
  ]
  function handleNext() {
    setStepState(stepState + 1)
  }
  function handlePrevious() {
    if(stepState === 0) return
    setStepState(stepState - 1)
  }

  function renderStep() {
    switch (stepState) {
      case 0:
        return <FirstStep />
      case 1:
        return <SecondStep />
      case 2:
        return <ThirdStep />
      default:
        return 'Step not found'
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white rounded-md shadow-md p-6 w-1/2 flex flex-col h-1/2">
        {renderStep()}
        <div className="flex self-end mt-4">
          {stepState !== 0 && (<button className="px-4 py-1 bg-blue-400 text-white rounded-md" onClick={handlePrevious}>Previous</button>)}
          {stepState !== steps.length - 1 && (<button className="px-4 py-1 bg-blue-400 ml-2 rounded-md text-white" onClick={handleNext}>Next</button>)}
          {stepState === steps.length - 1 && (<button className="px-4 py-1 bg-blue-400 ml-2 rounded-md text-white">Finish</button>)}
          
        </div>
      </div>
    </div>
  )
}