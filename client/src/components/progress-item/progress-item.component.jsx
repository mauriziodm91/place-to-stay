import { useEffect, useState, useContext } from 'react'
import { CheckCircleOutline } from '@mui/icons-material'
import { Box, ImageListItem } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { uploadFileProgress } from '../../utils/firebase'
import CircularProgressWithLabel from '../circular-progress-with-label/circular-progress-with-label.component'
import { Context } from '../../context/contextprovider.context'

const ProgressItem = ({ file }) => {
  const [progress, setProgress] = useState(0)
  const [imageURL, setImageURL] = useState(null)
  const { currentUser, setAlert, setUpdateImages } = useContext(Context)

  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + '.' + file.name.split('.').pop()
      try {
        const url = await uploadFileProgress(
          file,
          `rooms/${currentUser?.id}`,
          imageName,
          setProgress
        )
        setUpdateImages(url)
        setImageURL(null)
      } catch (error) {
        setAlert({ open: true, severity: 'error', message: error.message })
        console.log(error)
      }
    }
    setImageURL(URL.createObjectURL(file))
    uploadImage()
  }, [file])
  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt='gallery' loading='lazy' />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <CheckCircleOutline
              sx={{ width: 60, height: 60, color: 'lightgreen' }}
            />
          )}
        </Box>
      </ImageListItem>
    )
  )
}

export default ProgressItem

const backDrop = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0, .5)',
}
