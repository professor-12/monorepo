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
import { Outlet, Navigate } from "react-router-dom"
import CampusConnect from './pages'

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
    element: <CampusConnect />,
    children: [{
      path: "profile", element: <ProtectedLayout>
        <Profile />
      </ProtectedLayout>
    }]
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
    <>
      <Toaster position='bottom-right' />
      <div className='relative'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  )
}

export default App
