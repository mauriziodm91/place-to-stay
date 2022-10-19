import { useContext } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { Context } from '../../context/contextprovider.context'

const Notification = () => {
  const { alert, setAlert } = useContext(Context)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlert({ ...alert, open: false })
  }

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        sx={{ width: '100%' }}
        variant='filled'
        elevation={6}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}
export default Notification
