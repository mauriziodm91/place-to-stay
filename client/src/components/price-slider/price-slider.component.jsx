import { useContext } from 'react'
import { Box, Typography, Slider } from '@mui/material'
import { Context } from '../../context/contextprovider.context'

const marks = [
  { value: 0, label: '$0' },
  { value: 25, label: '$25' },
  { value: 50, label: '$50' },
]

const PriceSlider = () => {
  const { priceFilter, setPriceFilter } = useContext(Context)
  return (
    <Box sx={{ mt: 5 }}>
      <Typography>Max Price {'$' + priceFilter}</Typography>
      <Slider
        min={0}
        max={50}
        defaultValue={50}
        valueLabelDisplay='value'
        marks={marks}
        value={priceFilter}
        onChange={(e, price) => setPriceFilter(price)}
      />
    </Box>
  )
}

export default PriceSlider
