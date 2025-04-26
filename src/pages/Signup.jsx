import React, { useState } from 'react'
import axios from 'axios'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    contact: '',
    address: '',
    email: '',
    password: ''
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const response = await axios.post('lms-backend-three-nu.vercel.app/api/users/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        setSuccessMessage('Student registered successfully!')
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }
    } catch (error) {
      const err = error.response?.data?.message || 'Something went wrong during signup.'
      setErrorMessage(err)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSignup}>
          <Box mb={2}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Father's Name"
              name="fatherName"
              fullWidth
              required
              value={formData.fatherName}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Contact"
              name="contact"
              fullWidth
              required
              value={formData.contact}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Address"
              name="address"
              fullWidth
              multiline
              required
              value={formData.address}
              onChange={handleChange}
            />
          </Box>
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
              Signup
            </Button>
          </Box>
          <Box>
            <Button onClick={() => navigate('/')} fullWidth>
              Already have an account? Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default Signup
