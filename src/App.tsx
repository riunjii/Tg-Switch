import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes'
import { Toaster } from 'sonner'
import AuthProvider from './context/AuthContext'


export function App() {

  return (
    <>
      <Toaster />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

