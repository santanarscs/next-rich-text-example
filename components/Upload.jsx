import Dropzone from 'react-dropzone'

function Upload({onUpload}) {
  function renderDragMessage(
    isDragActive,
    isDragReject,
  ) {
    if (!isDragActive) {
      return (
        <div className="flex justify-center items-center text-xl py-11 text-gray-600">Select or drop your files here.</div>
      );
    }

    if (isDragReject) {
      return <div className="flex justify-center items-center text-xl py-11 text-red-600">Do not supported file</div>;
    }

    return <div className="flex justify-center items-center text-xl py-11 text-green-600">Drop your file</div>;
  }

  return (
    <>
      <Dropzone  onDropAccepted={(files) => onUpload(files)}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div className="border border-dashed border-gray-300 cursor-pointer"
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
          </div>
        )}
      </Dropzone>
    </>
  );
}

export { Upload }