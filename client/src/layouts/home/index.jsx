import ProtectedLayout from '@//components/ProtectedLayout'
import Navigation from '@/components/Navigation'
import React from 'react'
import { Outlet } from "react-router-dom"
const HomeLayout = () => {
      return (

            <div className='w-full  flex flex-col overflow-hidden bg-[#F3F3F4] h-[100dvh]'>
                  <div className='min-h-8 h-8 w-full'>
                  </div>
                  <div className='w-full flex flex-1'>
                        {/* Left nav bar */}
                        <div className='w-[4.5rem]'>
                              <Navigation />
                        </div>
                        <div className='border overflow-hidden rounded-tl-lg  border-border flex-1'>
                              <div className='w-full'>
                                    <Outlet />
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default HomeLayout