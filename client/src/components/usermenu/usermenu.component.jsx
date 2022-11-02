import { useContext } from 'react'
import { Menu, MenuItem, ListItemIcon } from '@mui/material'
import { Settings, Logout } from '@mui/icons-material'
import { Context } from '../../context/contextprovider.context'
import useCheckToken from '../../hooks/useCheckTokens'
import Profile from '../profile/profile.component'

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken()
  const { setCurrentUser, currentUser, setUpdateUser } = useContext(Context)
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null)
  }

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {!currentUser.google && (
          <MenuItem
            onClick={() =>
              setUpdateUser({
                open: true,
                file: null,
                photoURL: currentUser?.photoURL,
              })
            }
          >
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            Profile
          </MenuItem>
        )}

        <MenuItem onClick={() => setCurrentUser(null)}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  )
}

export default UserMenu
