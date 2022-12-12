import { useContext, useRef, useEffect } from 'react'
import { Box } from '@mui/material'
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl'
import { Context } from '../../context/contextprovider.context'
import Geocoder from '../geocoder/geocoder.component'
import 'mapbox-gl/dist/mapbox-gl.css'

const AddLocation = () => {
  const {
    location: { lng, lat },
    setUpdateLocation,
  } = useContext(Context)

  const mapRef = useRef()

  useEffect(() => {
    if (!lng && !lat) {
      fetch('https://ipapi.co/json')
        .then((response) => response.json())
        .then((data) => {
          mapRef.current.flyTo({ center: [data.longitude, data.latitude] })
          setUpdateLocation({ lng: data.longitude, lat: data.latitude })
        })
    }
  }, [])
  return (
    <Box
      sx={{
        height: 400,
        position: 'relative',
      }}
    >
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        initialViewState={{ longitude: lng, latitude: lat, zoom: 8 }}
        mapStyle='mapbox://styles/mapbox/streets-v11'
      >
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) =>
            setUpdateLocation({ lng: e.lngLat.lng, lat: e.lngLat.lat })
          }
        />
        <NavigationControl position='bottom-right' />
        <GeolocateControl
          position='top-left'
          trackUserLocation
          onGeolocate={(e) =>
            setUpdateLocation({
              lng: e.coords.longitude,
              lat: e.coords.latitude,
            })
          }
        />
        <Geocoder />
      </ReactMapGL>
    </Box>
  )
}

export default AddLocation
