import { useState, useContext } from 'react'
import {
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Input,
  InputAdornment,
} from '@mui/material'
import { Context } from '../../context/contextprovider.context'

const AddDetails = () => {
  const {
    details: { title, description, price },
    setUpdateDetails,
  } = useContext(Context)
  const [costType, setCostType] = useState(price ? 1 : 0)

  const handleCostTypeChange = (e) => {
    const costType = Number(e.target.value)
    setCostType(costType)
    if (costType === 0) {
      setUpdateDetails({ price: 0 })
    } else {
      setUpdateDetails({ price: 15 })
    }
  }

  const handlePriceChange = (e) => {
    setUpdateDetails({ price: e.target.value })
  }

  return (
    <Stack
      sx={{
        alignItems: 'center',
        '&.MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 },
      }}
    >
      <FormControl>
        <RadioGroup
          name='costType'
          value={costType}
          row
          onChange={handleCostTypeChange}
        >
          <FormControlLabel value={0} control={<Radio />} label='Free Stay' />
          <FormControlLabel value={1} control={<Radio />} label='Nominal Fee' />
          {Boolean(costType) && (
            <TextField
              sx={{ width: '7ch !important' }}
              variant='standard'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
              inputProps={{ type: 'number', min: 1, max: 50 }}
              value={price}
              onChange={handlePriceChange}
              name='price'
            />
          )}
        </RadioGroup>
      </FormControl>
    </Stack>
  )
}

export default AddDetails
