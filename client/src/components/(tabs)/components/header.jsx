import { useTab } from '@//store/TabProvider'
import React from 'react'

const TabHeader = ({ tabList }) => {
      const { tab, changeTab } = useTab()
      return (
            <ul className='w-full  sticky z-[99999] top-0 border-b bg-white border-border text-sm flex gap-3 max-md:gap-2  items-center h-12 px-4'>
                  <div className='relative h-full flex items-center gap-3'>
                        {
                              tabList.map(({ id, name }) => {
                                    const isActive = id == tab
                                    return (
                                          <div className='relative'>
                                                <li onClick={() => { changeTab(id) }} className={`inline-block max-md:text-xs mr-4 cursor-pointer  border-primary ${isActive && 'font-medium'}`}>{name}</li>
                                                {
                                                      isActive &&
                                                      <div className='bg-black absolute h-[1.7px] w-14 top-8' />
                                                }
                                          </div>
                                    )
                              })
                        }
                  </div>
            </ul>
      )
}

export default TabHeader