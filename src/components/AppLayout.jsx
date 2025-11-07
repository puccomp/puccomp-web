import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Toolbar, Box, CssBaseline } from '@mui/material'

// COMPONENTS
import Header from './Header'
import Footer from './Footer'
import CustomScrollbar from './CustomScrollbar'

const AppLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <CustomScrollbar />
      <Header />
      <Toolbar />
      <Box
        component="main"
        sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Outlet />
      </Box>
      <Footer />
      <ScrollRestoration />
    </Box>
  )
}

export default AppLayout
