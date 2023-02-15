import { useContext, useEffect } from 'react'
import { Context } from '../../context/contextprovider.context'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'

const ctrl = new MapBoxGeocoder({
  marker: false,
  accessToken: process.env.REACT_APP_MAP_TOKEN,
})

const GeocoderInput = () => {
  const { mapRef, containerRef, setClearAddress, setFilterAddress } =
    useContext(Context)

  useEffect(() => {
    if (containerRef?.current?.children[0]) {
      containerRef.current.removeChild(containerRef.current.children[0])
    }
    containerRef.current.appendChild(ctrl.onAdd(mapRef.current.getMap()))
    ctrl.on('result', (e) => {
      const coords = e.result.geometry.coordinates
      setFilterAddress(coords)
    })
    ctrl.on('clear', () => {
      setClearAddress()
    })
  }, [])
  return null
}

export default GeocoderInput
