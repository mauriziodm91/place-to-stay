import { Close, Send } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  TextField,
  Button,
} from '@mui/material'
import { useContext, useState, useRef, useEffect } from 'react'
import PasswordField from '../passwordfield/passwordField.component'
import GoogleOneTapLogin from '../google-one-tap-login/google-one-tap-login.component'
import { Context } from '../../context/contextprovider.context'

const Login = () => {
  const { setCloseLogin, openLogin, setAlert, setStartLoading, setEndLoading } =
    useContext(Context)
  const [title, setTitle] = useState('Login')
  const [isRegister, setIsRegister] = useState(false)
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    //testing loading
    setStartLoading()

    setTimeout(() => {
      setEndLoading()
    }, 6000)

    //testing notification
    const password = passwordRef.current.value
    const confirmPassword = confirmPasswordRef.current.value
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        severity: 'error',
        message: 'Passwords do not match',
      })
    }
  }

  useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login')
  }, [isRegister])
  return (
    <Dialog open={openLogin} onClose={setCloseLogin}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={setCloseLogin}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill your information in the fields below
          </DialogContentText>
          {isRegister && (
            <TextField
              autoFocus
              margin='normal'
              variant='standard'
              id='name'
              label='Name'
              type='text'
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin='normal'
            variant='standard'
            id='email'
            label='Email'
            type='email'
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id='confirmPassword'
              label='Confirm Password'
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type='submit' variant='contained' endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'left', padding: '5px 24px' }}>
        {isRegister
          ? 'Do you have an account? Sign in now'
          : "Dont't you have an account? Create one now"}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </Button>
      </DialogActions>

      <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
        <GoogleOneTapLogin />
      </DialogActions>
    </Dialog>
  )
}

export default Login
