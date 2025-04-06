import React, { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        console.log('Login successful:', response.data)
        await sessionStorage.setItem('token', response.data.token)
        await sessionStorage.setItem('userId', response.data.userId)
        // You can store token here: localStorage.setItem('token', response.data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      const err = error.response?.data?.message || 'Invalid email or password.'
      setErrorMessage(err)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </Box>
          <Box>
            <Button onClick={() => navigate('/signup')} fullWidth>
              Don't have an account? Sign up
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default Login
