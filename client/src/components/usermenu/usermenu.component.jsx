import { useContext } from 'react'
import { Menu, MenuItem, ListItemIcon } from '@mui/material'
import { Settings, Logout } from '@mui/icons-material'
import { Context } from '../../context/contextprovider.context'
import useCheckToken from '../../hooks/useCheckTokens'

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken()
  const { setCurrentUser, currentUser, setAlert } = useContext(Context)
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null)
  }

  const testAuthorization = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/room`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${currentUser.token}`,
        },
      })
      const data = await response.json()
      console.log(data)
      if (!data.success) {
        if (response.status === 401) setCurrentUser(null)
        throw new Error(data.message)
      }
    } catch (error) {
      setAlert({ open: true, severity: 'error', message: error.message })
      console.log(error)
    }
  }
  return (
    <Menu
      anchorEl={anchorUserMenu}
      open={Boolean(anchorUserMenu)}
      onClose={handleCloseUserMenu}
      onClick={handleCloseUserMenu}
    >
      <MenuItem onClick={testAuthorization}>
        <ListItemIcon>
          <Settings fontSize='small' />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={() => setCurrentUser(null)}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  )
}

export default UserMenu
