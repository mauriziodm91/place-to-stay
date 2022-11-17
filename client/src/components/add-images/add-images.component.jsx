import { useState, useCallback } from 'react'
import { Paper } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import ProgressList from '../progress-list/progress-list.component'
import ImagesList from '../images-list/images-list.component'

const AddImages = () => {
  const [files, setFiles] = useState([])
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  })
  return (
    <>
      <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
        <div style={{ padding: '16px' }} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: 'green' }}>Drop the files here...</p>
          ) : (
            <p>Drag 'n Drop some files here or click to select files</p>
          )}
          <em>
            (images with *.jpeg , *.png, *.jpg extension will be accepted)
          </em>
        </div>
      </Paper>
      <ProgressList {...{ files }} />
    </>
  )
}
export default AddImages
