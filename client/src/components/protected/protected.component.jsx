import { useContext } from 'react'
import { Context } from '../../context/contextprovider.context'
import AccessMessage from '../access-message/access-message.component'
const Protected = ({ children }) => {
  const { currentUser } = useContext(Context)
  return currentUser ? children : <AccessMessage />
}

export default Protected
