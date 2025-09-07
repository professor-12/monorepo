import React from 'react'
import { auth } from '../config/firebase'
import ChangeModal from "../components/(tabs)/components/channels/ChannelModal"
import {
      Popover,
      PopoverContent,
      PopoverTrigger,
} from "@/components/ui/popover"
import { signOut } from 'firebase/auth'
import { useAuth } from '../hooks/auth'
import { useState } from 'react'


const navData = [{ name: "", icon: "", link: "/" },
{ name: "Friends", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>, link: "/friends" },
{ name: "Settings", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /><circle cx="12" cy="12" r="3" /></svg>, link: "/settings" },
{ name: "Groups", icon: "", link: "/groups" }]


const Navigation = () => {
      const { user } = useAuth()
      const [modal, SetModal] = useState("")
      const handleChangeModal = (id) => {
            SetModal((prev) => id)
      }
      return (
            <div className='w-full overflow-hidden justify-between h-full pb-4  flex flex-col px-4'>
                  <div className='gap-4 flex flex-col'>
                        {

                              modal === 0 && <ChangeModal handleChangeModal={handleChangeModal} />
                        }
                        {
                              navData.map((item, indx) => {
                                    const isActive = 0 == indx
                                    if (indx == 0) {
                                          return (<div key={indx} className={`aspect-square text-white flex items-center justify-center ${isActive ? 'bg-[#5764F0]' : "bg-[#E7E7E9] !text-black"} rounded-[0.6rem] text-white text-center border-b last:border-none border-border`}>
                                                <span className='text-lg'>{user?.email?.substring(0, 2)}</span>
                                          </div>)
                                    }
                                    if (indx == 1) {
                                          return (

                                                <Popover>
                                                      <PopoverTrigger >
                                                            <div key={indx} className={`aspect-square text-white cursor-pointer flex items-center justify-center ${isActive ? 'bg-[#5764F0]' : "bg-[#E7E7E9] !text-black"} rounded-[0.6rem] text-white text-center border-b last:border-none border-border`}>
                                                                  <span className='text-lg'>{item.icon || "ES"}</span>
                                                            </div>
                                                      </PopoverTrigger>
                                                      <PopoverContent
                                                            side="right"
                                                            align="start"
                                                            sideOffset={12}
                                                            className="w-48 rounded-xl border border-gray-200 bg-white shadow-md"
                                                      >
                                                            <h1 className="px-3 py-2 text-sm font-semibold text-gray-700 border-b">
                                                                  Create
                                                            </h1>
                                                            <ul className="pt-3 text-sm text-gray-600">
                                                                  {["Channel", "Post", "Event"].map((item, idx) => (
                                                                        <li
                                                                              onClick={(e) => { SetModal(idx) }}
                                                                              key={idx}
                                                                              className="cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 hover:text-gray-900"
                                                                        >
                                                                              {item}
                                                                        </li>
                                                                  ))}
                                                            </ul>
                                                      </PopoverContent>

                                                </Popover>
                                          )
                                    }
                                    return (

                                          <div key={indx} className={`aspect-square text-white flex items-center justify-center ${isActive ? 'bg-[#5764F0]' : "bg-[#E7E7E9] !text-black"} rounded-[0.6rem] text-white text-center border-b last:border-none border-border`}>
                                                <span className='text-lg'>{item.icon || "ES"}</span>
                                          </div>
                                    )
                              })
                        }

                  </div>
                  <div onClick={async () => {
                        await signOut(auth)

                  }} className={`aspect-square flex items-center justify-center rounded-[0.6rem]  cursor-pointer text-red-500 border-b last:border-none border-border`}>
                        <span className='text-lg'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></svg></span>
                  </div>

            </div >
      )
}

export default Navigation