import { useContext, useEffect } from 'react'
import { Context } from '../context/contextprovider.context'
import jwtDecode from 'jwt-decode'

const useCheckToken = () => {
  const { currentUser, setCurrentUser } = useContext(Context)
  useEffect(() => {
    if (currentUser) {
      const decodedToken = jwtDecode(currentUser.token)
      if (decodedToken * 1000 < new Date().getTime()) setCurrentUser(null)
    }
  }, [])
}
export default useCheckToken
