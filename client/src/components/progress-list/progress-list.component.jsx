import { ImageList } from '@mui/material'
import ProgressItem from '../progress-item/progress-item.component'

const ProgressList = ({ files }) => {
  return (
    <ImageList
      rowHeight={250}
      sx={{
        '&MuiImageList-root': {
          gridTemplateColumns:
            'repeat(auto-fill, minmax(250px, 1fr))!important',
        },
      }}
    >
      {files.map((file, index) => (
        <ProgressItem file={file} key={index} />
      ))}
    </ImageList>
  )
}

export default ProgressList
