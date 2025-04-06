import React from 'react'
import { Container, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear session logic
    navigate('/')
  }

  return (
    <Container>
      <Typography variant="h3" mt={5} mb={3}>
        Welcome to Dashboard!
      </Typography>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  )
}

export default Dashboard
