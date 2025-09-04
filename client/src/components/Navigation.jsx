import React from 'react'


const navData = [{ name: "", icon: "", link: "/" },

{ name: "Friends", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>, link: "/friends" },
{ name: "Settings", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /><circle cx="12" cy="12" r="3" /></svg>, link: "/settings" },
{ name: "Groups", icon: "", link: "/groups" }]

const Navigation = () => {
      return (
            <div className='w-full overflow-hidden gap-4 flex flex-col px-4'>
                  {
                        navData.map((item, indx) => {
                              const isActive = 0 == indx
                              return (

                                    <div key={item} className={`aspect-square text-white flex items-center justify-center ${isActive ? 'bg-[#5764F0]' : "bg-[#E7E7E9] !text-black"} rounded-[0.6rem] text-white text-center border-b last:border-none border-border`}>
                                          <span className='text-lg'>{item.icon || "ES"}</span>
                                    </div>
                              )
                        })
                  }
            </div>
      )
}

export default Navigation