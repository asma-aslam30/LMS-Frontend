import React, { useState, useEffect } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress
} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()

  // Define state to hold form data
  const [studentData, setStudentData] = useState({
    name: '',
    fatherName: '',
    contact: '',
    address: ''
  })
  
  // Loading state for API call
  const [loading, setLoading] = useState(true)

  // Error state for API call
  const [error, setError] = useState(null)

  // Get token and userId from sessionStorage
  const token = sessionStorage.getItem('token')
  const userId = sessionStorage.getItem('userId')

  useEffect(() => {
    if (!token || !userId) {
      navigate('/login') // If no token or userId in sessionStorage, redirect to login
    }

    // Fetch student data from the API
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://lms-backend-zeta-kohl.vercel.app/api/student/getStudentById`, {
          params: { userId },
          headers: { token }
        })
        setStudentData(response.data.student)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch student data')
        setLoading(false)
      }
    }

    fetchStudentData()
  }, [token, userId, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setStudentData({ ...studentData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`https://lms-backend-zeta-kohl.vercel.app/api/student/updateStudentById`, studentData, {
        headers: { token }
      })
      alert('Profile updated successfully!')
    } catch (err) {
      setError('Failed to update profile')
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Edit Profile
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="name"
                fullWidth
                required
                value={studentData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Father's Name"
                name="fatherName"
                fullWidth
                required
                value={studentData.fatherName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact"
                name="contact"
                fullWidth
                value={studentData.contact}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                multiline
                value={studentData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  )
}

export default Profile
