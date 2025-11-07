import { createRoot } from 'react-dom/client' // <-- CORRIGIDO
import { 
  createBrowserRouter, 
  RouterProvider // <-- CORRIGIDO (importado de react-router-dom)
} from 'react-router-dom'
import { ThemeProvider, } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// STYLES
import theme from './styles/theme'

// CONTEXTS
import { MembersProvider } from './contexts/MembersContext'

// COMPONENTS
import AppLayout from './components/AppLayout'

// PAGES
import Home from './pages/home/Home'
import About from './pages/about/About'
import Team from './pages/Team'
import Apply from './pages/Apply'
import ProjectSubmission from './pages/ProjectSubmission'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/sobre', element: <About /> },
      { path: '/equipe', element: <Team /> },
      { path: '/torna-se-parte', element: <Apply /> },
      { path: '/desenvolva', element: <ProjectSubmission /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MembersProvider>
          <RouterProvider router={router} />
        </MembersProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </>
)