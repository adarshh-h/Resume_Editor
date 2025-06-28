import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const FileUploader = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        onUpload(file)
      } else {
        alert('Please upload a PDF or DOCX file')
      }
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  })

  return (
    <div 
      {...getRootProps()} 
      className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center cursor-pointer my-5 hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-gray-600">Drop the resume file here...</p>
      ) : (
        <p className="text-gray-600">Drag & drop a PDF or DOCX resume file here, or click to select</p>
      )}
    </div>
  )
}

export default FileUploader;