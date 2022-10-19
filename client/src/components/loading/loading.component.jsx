import { useContext } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import { Context } from '../../context/contextprovider.context'

const Loading = () => {
  const { loading } = useContext(Context)
  return (
    <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <CircularProgress sx={{ color: 'white' }} />
    </Backdrop>
  )
}

export default Loading
