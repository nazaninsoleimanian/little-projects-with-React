import React from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const App = () => {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <Container>
      <CssBaseline />
      <Typography variant='h4' align='center'>
        Form Validation
      </Typography>
      <form onSubmit={handleSubmit(() => console.log('submited'))}>
        <TextField
          fullWidth
          variant='outlined'
          label='your name'
          type='text'
          name='firstName'
          helperText={errors.firstName?.message}
          {...register('firstName')}
        />
        <TextField
          fullWidth
          variant='outlined'
          label='your lastName'
          type='text'
          name='lastName'
          helperText={errors.lastName?.message}
          {...register('lastName')}
        />
        <TextField
          fullWidth
          variant='outlined'
          label='your age'
          type='number'
          name='age'
          helperText={errors.age?.message}
          {...register('age')}
        />

        <Button type='submit' variant='contained' color='primary' fullWidth>
          submit
        </Button>
      </form>
    </Container>
  )
}

export default App
