import React from 'react'
import { Container, Typography } from '@mui/material'
import Navbar from '../components/Navbar'

const Courses = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" mt={5}>
          Courses Page
        </Typography>
      </Container>
    </>
  )
}

export default Courses
