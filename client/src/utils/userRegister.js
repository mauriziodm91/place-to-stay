import fetchData from './fetchData'
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
