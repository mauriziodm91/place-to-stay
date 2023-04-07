import { createContext, useReducer, useEffect, useRef } from 'react'
import { createAction } from '../utils/createAction.js'
import { applyFilter } from '../utils/applyFilter.js'

export const Context = createContext({
  currentUser: null,
  openLogin: false,
  setCurrentUser: () => null,
  setOpenLogin: () => null,
  setCloseLogin: () => null,
  setAlert: () => null,
  setStartLoading: () => null,
  setEndLoading: () => null,
  setUpdateUser: () => null,
  setUpdateImages: () => null,
  setDeleteImage: () => null,
  setUpdateDetails: () => null,
  setUpdateLocation: () => null,
  setResetRoom: () => null,
  setUpdateRooms: () => null,
  setPriceFilter: () => null,
  setFilterAddress: () => null,
  setClearAddress: () => null,
  alert: { open: false, severity: 'info', message: '' },
  loading: false,
  profile: { open: false, file: null, photoURL: '' },
  images: [],
  details: { title: '', description: '', price: 0 },
  location: { lng: 0, lat: 0 },
  rooms: [],
  mapRef: null,
  priceFilter: 0,
  containerRef: null,
  filteredRooms: [],
  room: null,
  setUpdateRoom: () => null,
})

const ACTION_TYPES = {
  USER_UPDATE: 'USER_UPDATE',
  OPEN_LOGIN: 'OPEN_LOGIN',
  CLOSE_LOGIN: 'CLOSE_LOGIN',
  UPDATE_ALERT: 'UPDATE_ALERT',
  START_LOADING: 'START_LOADING',
  END_LOADING: 'END_LOADING',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  UPDATE_IMAGES: 'UPDATE_IMAGES',
  DELETE_IMAGE: 'DELETE_IMAGE',
  UPDATE_DETAILS: 'UPDATE_DETAILS',
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  RESET_ROOM: 'RESET_ROOM',
  UPDATE_ROOMS: 'UPDATE_ROOMS',
  FILTER_PRICE: 'FILTER_PRICE',
  FILTER_ADDRESS: 'FILTER_ADDRESS',
  CLEAR_ADDRESS: 'CLEAR_ADDRESS',
  UPDATE_ROOM: 'UPDATE_ROOM',
}

const INITIAL_STATE = {
  currentUser: null,
  openLogin: false,
  alert: { open: false, severity: 'info', message: '' },
  loading: false,
  profile: { open: false, file: null, photoUrl: '' },
  images: [],
  details: { title: '', description: '', price: 0 },
  location: { lng: 0, lat: 0 },
  rooms: [],
  priceFilter: 50,
  addressFilter: null,
  filteredRooms: [],
  room: null,
}

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTION_TYPES.OPEN_LOGIN:
      return { ...state, openLogin: true }
    case ACTION_TYPES.CLOSE_LOGIN:
      return { ...state, openLogin: false }
    case ACTION_TYPES.START_LOADING:
      return { ...state, loading: true }
    case ACTION_TYPES.END_LOADING:
      return { ...state, loading: false }
    case ACTION_TYPES.USER_UPDATE:
      localStorage.setItem('currentUser', JSON.stringify(payload))
      return { ...state, currentUser: payload }
    case ACTION_TYPES.UPDATE_ALERT:
      return { ...state, alert: payload }
    case ACTION_TYPES.UPDATE_PROFILE:
      return { ...state, profile: payload }
    case ACTION_TYPES.UPDATE_IMAGES:
      return { ...state, images: [...state.images, payload] }
    case ACTION_TYPES.DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter((image) => image !== payload),
      }
    case ACTION_TYPES.UPDATE_DETAILS:
      return {
        ...state,
        details: { ...state.details, ...payload },
      }
    case ACTION_TYPES.UPDATE_LOCATION:
      return {
        ...state,
        location: payload,
      }
    case ACTION_TYPES.RESET_ROOM:
      return {
        ...state,
        images: [],
        details: { title: '', description: '', price: 0 },
        location: { lng: 0, lat: 0 },
      }
    case ACTION_TYPES.UPDATE_ROOMS:
      return {
        ...state,
        rooms: payload,
        addressFilter: null,
        priceFilter: 50,
        filteredRooms: payload,
      }
    case ACTION_TYPES.FILTER_PRICE:
      return {
        ...state,
        priceFilter: payload,
        filteredRooms: applyFilter(state.rooms, state.addressFilter, payload),
      }

    case ACTION_TYPES.FILTER_ADDRESS:
      return {
        ...state,
        addressFilter: payload,
        filteredRooms: applyFilter(state.rooms, payload, state.priceFilter),
      }

    case ACTION_TYPES.CLEAR_ADDRESS:
      return {
        ...state,
        addressFilter: null,
        priceFilter: 50,
        filteredRooms: state.rooms,
      }

    case ACTION_TYPES.UPDATE_ROOM:
      return {
        ...state,
        room: payload,
      }
    default:
      throw new Error('no matched action')
  }
}

export const ContextProvider = ({ children }) => {
  const [
    {
      currentUser,
      openLogin,
      alert,
      loading,
      profile,
      images,
      details,
      location,
      rooms,
      priceFilter,
      filteredRooms,
      room,
    },
    dispatch,
  ] = useReducer(reducer, INITIAL_STATE)
  const mapRef = useRef()
  const containerRef = useRef()

  const setCurrentUser = (user) => {
    dispatch(createAction(ACTION_TYPES.USER_UPDATE, user))
  }

  const setOpenLogin = () => {
    dispatch(createAction(ACTION_TYPES.OPEN_LOGIN))
  }
  const setCloseLogin = () => {
    dispatch(createAction(ACTION_TYPES.CLOSE_LOGIN))
  }

  const setStartLoading = () => {
    dispatch(createAction(ACTION_TYPES.START_LOADING))
  }
  const setEndLoading = () => {
    dispatch(createAction(ACTION_TYPES.END_LOADING))
  }

  const setAlert = (alertParameters) => {
    dispatch(createAction(ACTION_TYPES.UPDATE_ALERT, alertParameters))
  }

  const setUpdateUser = (profile) => {
    dispatch(createAction(ACTION_TYPES.UPDATE_PROFILE, profile))
  }

  const setUpdateImages = (url) => {
    dispatch(createAction(ACTION_TYPES.UPDATE_IMAGES, url))
  }

  const setDeleteImage = (image) => {
    dispatch(createAction(ACTION_TYPES.DELETE_IMAGE, image))
  }

  const setUpdateDetails = (detail) => {
    dispatch(createAction(ACTION_TYPES.UPDATE_DETAILS, detail))
  }

  const setUpdateLocation = (location) => {
    dispatch(createAction(ACTION_TYPES.UPDATE_LOCATION, location))
  }

  const setResetRoom = () => {
    dispatch(createAction(ACTION_TYPES.RESET_ROOM))
  }

  const setUpdateRooms = (rooms) => {
    dispatch(createAction(ACTION_TYPES.UPDATE_ROOMS, rooms))
  }

  const setPriceFilter = (filterPrice) => {
    dispatch(createAction(ACTION_TYPES.FILTER_PRICE, filterPrice))
  }

  const setFilterAddress = (coords) => {
    dispatch(createAction(ACTION_TYPES.FILTER_ADDRESS, coords))
  }

  const setClearAddress = () => {
    dispatch(createAction(ACTION_TYPES.CLEAR_ADDRESS))
  }

  const setUpdateRoom = (room) => {
    dispatch(createAction(ACTION_TYPES.UPDATE_ROOM, room))
  }

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('currentUser'))
    if (loggedUser) {
      setCurrentUser(loggedUser)
    }
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
    openLogin,
    alert,
    setOpenLogin,
    setCloseLogin,
    setAlert,
    loading,
    setStartLoading,
    setEndLoading,
    setUpdateUser,
    profile,
    setUpdateImages,
    images,
    setDeleteImage,
    setUpdateDetails,
    details,
    location,
    setUpdateLocation,
    setResetRoom,
    rooms,
    setUpdateRooms,
    mapRef,
    priceFilter,
    setPriceFilter,
    containerRef,
    setFilterAddress,
    setClearAddress,
    filteredRooms,
    room,
    setUpdateRoom,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}
