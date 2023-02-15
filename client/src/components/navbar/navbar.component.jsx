import { useContext, useState } from 'react'
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
} from '@mui/material'
import { Menu, Lock } from '@mui/icons-material'
import { Context } from '../../context/contextprovider.context'
import UserIcon from '../userIcon/userIcon.component'
import SideBar from '../sidebar/sidebar.component'

const NavBar = () => {
  const { currentUser, setOpenLogin } = useContext(Context)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <AppBar>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Box sx={{ mr: 1 }}>
              <IconButton
                size='large'
                color='inherit'
                onClick={() => setIsOpen(true)}
              >
                <Menu />
              </IconButton>
            </Box>
            <Typography
              variant='h6'
              component='h1'
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
              Your Next Room
            </Typography>
            <Typography
              variant='h6'
              component='h1'
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              YNR
            </Typography>
            {!currentUser ? (
              <Button
                color='inherit'
                startIcon={<Lock />}
                onClick={() => setOpenLogin()}
              >
                Login
              </Button>
            ) : (
              <UserIcon currentUser={currentUser} />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <SideBar {...{ isOpen, setIsOpen }} />
    </>
  )
}

export default NavBar
