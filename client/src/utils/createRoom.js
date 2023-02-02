import fetchData from './fetchData'
const url = process.env.REACT_APP_SERVER_URL + '/room'

export const createRoom = async (
  room,
  currentUser,
  setStartLoading,
  setEndLoading,
  setAlert,
  setCurrentUser,
  setResetUser,
  setPage
) => {
  setStartLoading()
  const result = await fetchData(
    { url, body: room, token: currentUser?.token },
    setCurrentUser,
    setAlert
  )
  if (result) {
    setAlert({
      open: true,
      severity: 'success',
      message: 'The room has been added successfuly',
    })
    setResetUser()
    setPage(0)
  }
  setEndLoading()
}
