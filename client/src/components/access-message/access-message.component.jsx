import { Lock } from '@mui/icons-material'
import { Alert, AlertTitle, Button, Container } from '@mui/material'
import { useContext } from 'react'
import { Context } from '../../context/contextprovider.context'

const AccessMessage = () => {
  const { setOpenLogin } = useContext(Context)
  return (
    <Container sx={{ py: 5 }}>
      <Alert severity='error' variant='outlined'>
        <AlertTitle>Forbidden Access</AlertTitle>
        Please login or register to access this page
        <Button
          variant='outlined'
          sx={{ ml: 2 }}
          startIcon={<Lock />}
          onClick={() => setOpenLogin()}
        >
          login
        </Button>
      </Alert>
    </Container>
  )
}

export default AccessMessage
