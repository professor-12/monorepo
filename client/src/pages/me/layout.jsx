import React from 'react'
import { Outlet } from "react-router-dom"

const AccountLayout = () => {

      return (
            <div className='w-full flex flex-col bg-[#FFFFFF] h-[100dvh]'>
                  <div className='mx-auto w-[70%] flex h-[100dvh] pt-[5rem]'>
                        <div className='w-[20rem] border-r border-border h-full'></div>
                        <div className='flex-1 px-6 h-full'>
                              <Outlet />
                        </div>
                  </div>
            </div>
      )
}

export default AccountLayout