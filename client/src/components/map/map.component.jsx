import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/contextprovider.context'
import { getRooms } from '../../utils/roomsActions'
import ReactMapGl, { Marker } from 'react-map-gl'
import { Avatar, Box, Paper, Tooltip } from '@mui/material'
import Supercluster from 'supercluster'
import './map.styles.css'

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
})

const ClusterMap = () => {
  const { rooms, setAlert, setUpdateRooms, mapRef } = useContext(Context)
  const [points, setPoints] = useState([])
  const [clusters, setClusters] = useState([])
  const [bounds, setBounds] = useState([-180, -85, 180, 85])
  const [zoom, setZoom] = useState(0)

  useEffect(() => {
    getRooms(setAlert, setUpdateRooms)
  }, [])

  useEffect(() => {
    const points = rooms.map((room) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        lng: room.lng,
        lat: room.lat,
        images: room.images,
        uPhoto: room.uPhoto,
        uName: room.uName,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(room.lng), parseFloat(room.lat)],
      },
    }))
    setPoints(points)
  }, [rooms])

  useEffect(() => {
    supercluster.load(points)
    setClusters(supercluster.getClusters(bounds, zoom))
  }, [points, zoom, bounds])

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat())
    }
  }, [mapRef?.current])
  return (
    <Box sx={{ height: 530, position: 'relative' }}>
      <ReactMapGl
        initialViewState={{
          latitude: -34.6075682,
          longitude: -58.4370894,
          zoom: 12,
        }}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        ref={mapRef}
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
      >
        {clusters.map((cluster) => {
          const { cluster: isCluster, point_count } = cluster.properties
          const [longitude, latitude] = cluster.geometry.coordinates
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <div
                  className='cluster-marker'
                  style={{
                    width: `${10 + (point_count / points.length) * 20}px`,
                    height: `${10 + (point_count / points.length) * 20}px`,
                  }}
                  onClick={(e) => {
                    const zoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    )
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      zoom,
                      speed: 1,
                    })
                  }}
                >
                  {point_count}
                </div>
              </Marker>
            )
          }
          return (
            <Marker
              key={`room-${cluster.properties.roomId}`}
              longitude={longitude}
              latitude={latitude}
            >
              <Tooltip title={cluster.properties.uName}>
                <Avatar
                  src={cluster.properties.uPhoto}
                  component={Paper}
                  elevation={2}
                />
              </Tooltip>
            </Marker>
          )
        })}
      </ReactMapGl>
    </Box>
  )
}

export default ClusterMap
