import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './layouts/auth'
import Login from './pages/login'
import Signup from './pages/sign-up'
import { Toaster } from 'react-hot-toast'
import HomeLayout from './layouts/home'
import ProtectedLayout from './components/ProtectedLayout'
import Profile from './pages/me/profile'
import AccountLayout from './pages/me/layout'
import HomePage from './pages/home'
import TabProvider from './store/TabProvider'
import { Outlet } from "react-router-dom"

const router = createBrowserRouter([

  {
    path: '/home',
    element: <ProtectedLayout>
      <HomeLayout />
    </ProtectedLayout>,
    children: [{
      path: "", element: <TabProvider>
        <HomePage />
      </TabProvider>
    }]
  },
  {
    path: '',
    element: <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>,
    children: [{ path: "profile", element: <Profile /> }]
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Signup />
      },
    ],
  },
])
function App() {

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position='top-right' />
    </div>
  )
}

export default App
