import fetchData from './fetchData'
import { uploadFile } from './firebase'
import { v4 as uuidv4 } from 'uuid'
const url = process.env.REACT_APP_SERVER_URL + '/user'

export const register = async (
  user,
  setStartLoading,
  setEndLoading,
  setCurrentUser,
  setAlert,
  setCloseLogin
) => {
  //WE FETCH HERE
  setStartLoading()
  const result = await fetchData(
    { url: url + '/register', body: user },
    setCurrentUser,
    setAlert
  )
  if (result) {
    setCurrentUser(result)
    setCloseLogin()
    setAlert({
      open: true,
      severity: 'success',
      message: 'Your account was created successfully',
    })
  }
  setEndLoading()
}

export const login = async (
  user,
  setStartLoading,
  setEndLoading,
  setCurrentUser,
  setCloseLogin
) => {
  setStartLoading()
  const result = await fetchData(
    { url: url + '/login', body: user },
    setCurrentUser
  )
  if (result) {
    setCurrentUser(result)
    setCloseLogin()
  }
  setEndLoading()
}

export const updateProfile = async (
  currentUser,
  updatedFields,
  setStartLoading,
  setEndLoading,
  setCurrentUser,
  setUpdateUser,
  setAlert,
  profile
) => {
  setStartLoading()
  const { name, file } = updatedFields
  let body = { name }
  try {
    if (file) {
      const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop()
      const photoURL = await uploadFile(
        file,
        `profile/${currentUser?.id}/${imageName}`
      )
      body = { ...body, photoURL }
    }
    const result = await fetchData(
      {
        url: url + '/updateProfile',
        method: 'PUT',
        body,
        token: currentUser.token,
      },
      setCurrentUser,
      setAlert
    )
    console.log(result)
    if (result) {
      setCurrentUser({ ...currentUser, ...result })
      console.log(currentUser)
      setAlert({
        open: true,
        severity: 'success',
        message: 'Your profile has updated successfully',
      })
      setUpdateUser({ open: false, file: null, photoURL: result.photoURL })
    }
  } catch (error) {
    setAlert({
      open: true,
      severity: 'error',
      message: error.message,
    })
    console.log(error)
  }
  setEndLoading()
}
