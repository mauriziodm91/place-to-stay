import { useState, useContext, useEffect } from 'react'
import {
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
  Box,
} from '@mui/material'
import AddLocation from '../add-location/add-location.component'
import AddDetails from '../add-details/add-details.component'
import AddImages from '../add-images/add-images.component'
import { Context } from '../../context/contextprovider.context'

const AddRoom = () => {
  const [activeStep, setActiveStep] = useState(0)
  const { images, details, location } = useContext(Context)
  const [steps, setSteps] = useState([
    { label: 'Location', completed: false },
    { label: 'Details', completed: false },
    { label: 'Images', completed: false },
  ])

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1)
    } else {
      const stepIndex = findUnfinished()
      setActiveStep(stepIndex)
    }
  }

  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false
    const index = findUnfinished()
    if (index !== -1) return false
    return true
  }
  const findUnfinished = () => steps.findIndex((step) => !step.completed)

  useEffect(() => {
    if (images.length) {
      if (!steps[2].completed) setComplete(2, true)
    } else {
      if (steps[2].completed) setComplete(2, false)
    }
  }, [images])

  useEffect(() => {
    if (details.title.length > 4 && details.description.length > 9) {
      if (!steps[1].completed) setComplete(1, true)
    } else {
      if (steps[1].completed) setComplete(1, false)
    }
  }, [details])

  useEffect(() => {
    if (location.lng || location.lng) {
      if (!steps[0].completed) setComplete(0, true)
    } else {
      if (steps[0].completed) setComplete(0, false)
    }
  }, [location])

  const setComplete = (index, status) => {
    setSteps((steps) => {
      steps[index].completed = status
      return [...steps]
    })
  }
  return (
    <Container sx={{ my: 4 }}>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{ mb: 3 }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.completed}>
            <StepButton onClick={() => setActiveStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box>
        {
          { 0: <AddLocation />, 1: <AddDetails />, 2: <AddImages /> }[
            activeStep
          ]
        }
      </Box>
      <Stack
        direction='row'
        sx={{ pt: 2, pb: 7, justifyContent: 'space-around' }}
      >
        <Button
          color='inherit'
          disabled={!activeStep}
          onClick={() => setActiveStep((activeStep) => activeStep - 1)}
        >
          Back
        </Button>
        <Button disabled={checkDisabled()} onClick={handleNext}>
          Next
        </Button>
      </Stack>
    </Container>
  )
}

export default AddRoom
