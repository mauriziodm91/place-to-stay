import { useContext } from 'react'
import { Context } from '../../context/contextprovider.context'

import {
  Container,
  ImageList,
  Card,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
  Avatar,
  Rating,
} from '@mui/material'
import { StarBorder } from '@mui/icons-material'
const Rooms = () => {
  const { filteredRooms } = useContext(Context)
  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns: 'repeat(auto-fill,minmax(280px, 1fr))!important',
        }}
      >
        {filteredRooms.map((room) => (
          <Card key={room._id}>
            <ImageListItem sx={{ height: '100 !important' }}>
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                }}
                title={room.price === 0 ? 'Free Stay' : '$' + room.price}
                actionIcon={
                  <Tooltip title={room.uName} sx={{ mr: '5px' }}>
                    <Avatar src={room.uPhoto} />
                  </Tooltip>
                }
                position='top'
              />
              <img
                src={room.images[0]}
                alt={room.title}
                loading='lazy'
                style={{ cursor: 'pointer' }}
              />
              <ImageListItemBar
                title={room.title}
                actionIcon={
                  <Rating
                    sx={{ color: 'rgba(255,255,255,0.8)', mr: '5 px' }}
                    name='room-rating'
                    defaultValue={3.5}
                    precision={0.5}
                    emptyIcon={
                      <StarBorder sx={{ color: 'rgba(255,255,255,0.8)' }} />
                    }
                  />
                }
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  )
}

export default Rooms
