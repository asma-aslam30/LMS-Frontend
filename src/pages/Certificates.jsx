import React from 'react'
import { Container, Typography } from '@mui/material'
import Navbar from '../components/Navbar'

const Certificates = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" mt={5}>
            Certificates Page
        </Typography>
      </Container>
    </>
  )
}

export default Certificates
