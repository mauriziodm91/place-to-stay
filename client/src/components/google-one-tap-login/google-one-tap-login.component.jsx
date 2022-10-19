import { useState, useContext } from 'react'
import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'
import { Context } from '../../context/contextprovider.context'
import jwtDecode from 'jwt-decode'

const GoogleOneTapLogin = () => {
  const { setAlert, setCurrentUser, setCloseLogin } = useContext(Context)
  const [disabled, setDisabled] = useState(false)

  const handleResponse = (response) => {
    const token = response.credential
    const decodedToken = jwtDecode(token)
    const { sub, email, name, picture } = decodedToken
    setCurrentUser({
      id: sub,
      email,
      name,
      photoUrl: picture,
      token,
      google: true,
    })
    setCloseLogin()
  }

  const handleGoogleLogin = () => {
    setDisabled(true)
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      })
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error('Try to clear cookies or try again later')
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          setDisabled(false)
        }
      })
    } catch (error) {
      setAlert({ open: true, severity: 'error', message: error.message })
      console.log(error)
    }
  }
  return (
    <Button
      variant='outlined'
      startIcon={<Google />}
      disabled={disabled}
      onClick={handleGoogleLogin}
    >
      Login With Google
    </Button>
  )
}

export default GoogleOneTapLogin
