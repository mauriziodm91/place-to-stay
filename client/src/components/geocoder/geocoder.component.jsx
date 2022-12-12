import { useContext } from 'react'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useControl } from 'react-map-gl'
import { Context } from '../../context/contextprovider.context'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const Geocoder = () => {
  const { setUpdateLocation } = useContext(Context)
  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.REACT_APP_MAP_TOKEN,
    marker: false,
    collapsed: true,
  })
  useControl(() => ctrl)
  ctrl.on('result', (e) => {
    const coords = e.results.geometry.coordinates
    setUpdateLocation({ lng: coords[0], lat: coords[1] })
  })
  return null
}

export default Geocoder
