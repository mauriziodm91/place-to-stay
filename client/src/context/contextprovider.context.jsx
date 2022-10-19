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
  alert: { open: false, severity: 'info', message: '' },
  loading: false,
})

const ACTION_TYPES = {
  USER_UPDATE: 'USER_UPDATE',
  OPEN_LOGIN: 'OPEN_LOGIN',
  CLOSE_LOGIN: 'CLOSE_LOGIN',
  UPDATE_ALERT: 'UPDATE_ALERT',
  START_LOADING: 'START_LOADING',
  END_LOADING: 'END_LOADING',
}

const INITIAL_STATE = {
  currentUser: null,
  openLogin: false,
  alert: { open: false, severity: 'info', message: '' },
  loading: false,
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
    default:
      throw new Error('no matched action')
  }
}

export const ContextProvider = ({ children }) => {
  const [{ currentUser, openLogin, alert, loading }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  )

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
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}
