import { createContext, useReducer, useEffect } from 'react'
import { createAction } from '../utils/createAction.js'

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
  alert: { open: false, severity: 'info', message: '' },
  loading: false,
  profile: { open: false, file: null, photoURL: '' },
  images: [],
  details: { title: '', description: '', price: 0 },
  location: { lng: 0, lat: 0 },
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
    },
    dispatch,
  ] = useReducer(reducer, INITIAL_STATE)

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
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}
