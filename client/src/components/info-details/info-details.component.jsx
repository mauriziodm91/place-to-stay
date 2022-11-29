import { useState, useContext } from 'react'
import { Avatar, InputAdornment, TextField } from '@mui/material'
import pendingIcon from '../../assets/progress1.svg'
import { Check } from '@mui/icons-material'
import { Context } from '../../context/contextprovider.context'

let timer
const InfoField = ({ mainProps, optionalProps = {}, minlength }) => {
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const { setUpdateDetails } = useContext(Context)

  const handleChange = (e) => {
    setUpdateDetails({ [e.target.name]: e.target.value })
    if (!editing) setEditing(true)
    clearTimeout(timer)
    timer = setTimeout(() => {
      setEditing(false)
      if (e.target.value.length < minlength) {
        if (!error) setError(true)
        if (success) setSuccess(false)
      } else {
        if (error) setError(false)
        if (!success) setSuccess(true)
      }
    }, 1000)
  }

  return (
    <TextField
      {...mainProps}
      {...optionalProps}
      error={error}
      helperText={error && `This field must be ${minlength} characters or more`}
      color={success ? 'success' : 'primary'}
      variant='outlined'
      required
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            {editing ? (
              <Avatar src={pendingIcon} sx={{ height: 70 }} />
            ) : (
              success && <Check color='success' />
            )}
          </InputAdornment>
        ),
      }}
    />
  )
}

export default InfoField
