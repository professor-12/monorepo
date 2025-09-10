import { CancelSvg } from '@//components/modal/add-post';
import EditProfileModal from '@//components/modal/EditProfileModal';
import { useAuth } from '@//hooks/auth'
import useProfile from '@//hooks/useProfile'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

const Profile = () => {
      const { user } = useAuth()
      const route = useNavigate()
      const params = useSearchParams()[0];
      const d = useSearchParams(params)
      const [openProfile, setOpenProfile] = useState(false)
      const a = new URLSearchParams(params)
      const { isLoading, data } = useProfile()
      const { data: _data } = data || {}
      const isOwner = _data?.user?.firebaseUid === user?.uid
      if (isLoading) {
            return <div>Loading...</div>
      }

      return (
            <div className='mx-auto max-w-2xl mt-12 w-[80%]'>
                  {openProfile && <EditProfileModal handleCloseModal={() => {
                        setOpenProfile(false)
                  }} data={_data} />}
                  <div className='flex justify-between'>
                        <div className='flex-1'>
                              <h2 className='text-lg font-bold'>Profile Information</h2>
                              <p className='text-sm text-gray-600'>Manage your profile information and settings</p>
                        </div>
                        <div>
                              <div onClick={() => {
                                    route("/home")
                              }} className='border cursor-pointer rounded-full'>
                                    <CancelSvg />
                              </div>
                        </div>
                  </div>
                  <div className='w-full bg-[#F3F3F4] pb-5 mt-8  rounded-md'>
                        <div className='w-full relative bg-primary mt-8 h-[8rem] rounded-t-md'>
                              <div className='absolute bg-gray-300 left-4 rounded-full overflow-hidden top-[70%] size-[6.5rem] border-[.3em] border-[#F3F3F4]'>
                                    <div className='w-full h-full relative'>
                                          <img src={_data?.picture} className='w-full object-center object-cover h-full absolute top-0 bottom-0 left-0 right-0' alt="" />
                                    </div>
                              </div>
                        </div>
                        <div className='w-full pr-4 justify-between cursor-pointer flex items-center pl-[8rem] pt-3 pb-12'>
                              <div>
                                    <h1>{_data?.displayName ? _data?.displayName : _data?.user?.username}</h1>
                                    <p className='pb-2 text-xs text-slate-600/90'>
                                          {_data?.bio}
                                    </p>
                              </div>

                              {
                                    isOwner &&
                                    <Button onClick={() => {
                                          setOpenProfile(true)
                                    }} className="inline">Edit User Profile</Button>
                              }
                        </div>

                        <div className='space-y-4 mx-4 bg-white rounded-md p-4  border-border'>
                              <div className='flex justify-between'>
                                    <div>
                                          <h1 className=''>Display name</h1>
                                          <p className='text-sm text-gray-600'>{_data?.displayName}</p>
                                    </div>

                              </div>
                              <div className='flex justify-between'>
                                    <div>
                                          <h1 className=''>Username</h1>
                                          <p className='text-sm text-gray-600'>{_data?.user?.username}</p>
                                    </div>

                              </div>
                              <div className='flex justify-between'>
                                    <div>
                                          <h1 className=''>Email</h1>
                                          <p className='text-sm text-gray-600'>{_data?.user?.email}</p>
                                    </div>

                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default Profile