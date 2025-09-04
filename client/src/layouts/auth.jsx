import React from 'react'

import { Outlet } from "react-router-dom"
const Auth = () => {
      return (
            <div className='w-full bg-[#FFFFFF] h-[100dvh] flex'>
                  {/* Banner */}
                  <div className='flex-1 p-2 h-full max-md:hidden'>
                        <div className='bg-[#4153EF] rounded-3xl  flex items-center justify-center w-full h-full'>
                              <div className='h-[80%] flex flex-col w-full px-10 '>
                                    <h1 className='text-white text-4xl'>Connect with people on campus<span className='size-[12rem] rounded-full bg-white'></span></h1>
                                    <p className='text-sm mt-2 text-white'>Lorem cia dolores quo sit distinctio. Accusamus, delectus.</p>
                                    <div className='w-full flex-1 rounded-3xl mt-8 p-4 bg-white'>
                                          Picture coming soon!!!!!!!!!!!!!!
                                    </div>
                              </div>

                        </div>
                  </div>
                  <div className='flex-1 items-center justify-center flex h-full overflow-auto'>
                        <Outlet />
                  </div>
            </div>
      )
}

export default Auth