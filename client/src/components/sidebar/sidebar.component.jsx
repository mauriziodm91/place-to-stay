import { useContext } from 'react'
import { Drawer, styled, IconButton, Typography, Box } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
import PriceSlider from '../price-slider/price-slider.component'
import { Context } from '../../context/contextprovider.context'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const SideBar = ({ isOpen, setIsOpen }) => {
  const { containerRef } = useContext(Context)

  return (
    <Drawer open={isOpen} variant='persistent' hideBackdrop={true}>
      <DrawerHeader>
        <Typography>Apply Search or Filter</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize='large' />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ width: 240, p: 3 }}>
        <Box ref={containerRef}></Box>
        <PriceSlider />
      </Box>
    </Drawer>
  )
}

export default SideBar
