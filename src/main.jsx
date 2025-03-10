import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './pages/Root.jsx'
import router from './routes/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FirebaseProvider from './providers/FirebaseProvider.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FirebaseProvider>
        <RouterProvider router={router}>
          <Root />
        </RouterProvider>
      </FirebaseProvider>
    </QueryClientProvider>
  </StrictMode>,
)
