import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Container, Paper } from '@mui/material'
import { AdminPanelSettings } from '@mui/icons-material'

const Dashboard = () => {

  const Appbar = <Paper elevation={3} xs={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }} >
          <Stack>
            <AdminPanelSettings/>
          </Stack>
  </Paper>

  return (
    <AdminLayout>
      <Container component={'main'}>
        {
          Appbar
        }
      </Container>
    </AdminLayout>
  )
}

export default Dashboard