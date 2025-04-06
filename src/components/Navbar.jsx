import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <AppBar position="fixed" sx={{ width: '100%' }} color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          LMS Dashboard
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
          <Button color="inherit" onClick={() => navigate('/courses')}>Courses</Button>
          <Button color="inherit" onClick={() => navigate('/certificates')}>Certificates</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
