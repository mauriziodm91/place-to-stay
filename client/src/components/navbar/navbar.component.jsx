import { useContext } from 'react'
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

const NavBar = () => {
  const { currentUser, setOpenLogin } = useContext(Context)
  return (
    <AppBar>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <IconButton size='large' color='inherit'>
              <Menu />
            </IconButton>
          </Box>
          <Typography
            variant='h6'
            component='h1'
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            Youre Welcome
          </Typography>
          <Typography
            variant='h6'
            component='h1'
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            YRW
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
  )
}

export default NavBar
