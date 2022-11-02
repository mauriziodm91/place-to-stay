import { useState } from 'react'
import { Badge, Box, IconButton, Tooltip, Avatar } from '@mui/material'
import { Mail, Notifications } from '@mui/icons-material'
import UserMenu from '../usermenu/usermenu.component'
import useCheckToken from '../../hooks/useCheckTokens'

const UserIcon = ({ currentUser }) => {
  useCheckToken()
  const [anchorUserMenu, setAnchorUserMenu] = useState(null)
  return (
    <Box>
      <IconButton size='large' color='inherit'>
        <Badge color='error' badgeContent={5}>
          <Mail />
        </Badge>
      </IconButton>
      <IconButton size='large' color='inherit'>
        <Badge color='error' badgeContent={20}>
          <Notifications />
        </Badge>
      </IconButton>

      <Tooltip title='Open User Settings'>
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Box>
  )
}

export default UserIcon
