import { useTab } from '@//store/TabProvider'
import React from 'react'

const TabHeader = ({ tabList }) => {
      const { tab, changeTab } = useTab()
      return (
            <div className='w-full sticky z-[99999] top-0 border-b bg-white border-border h-12 px-2 sm:px-4'>
                  <div className='relative h-full flex items-center overflow-x-auto scrollbar-hide'>
                        <div className='flex gap-2 sm:gap-3 min-w-max'>
                              {
                                    tabList.map(({ id, name }) => {
                                          const isActive = id == tab
                                          return (
                                                <div key={id} className='relative'>
                                                      <button 
                                                            onClick={() => { changeTab(id) }} 
                                                            className={`px-3 py-2 text-sm sm:text-base cursor-pointer transition-colors whitespace-nowrap ${
                                                                  isActive ? 'font-medium text-black' : 'text-gray-600 hover:text-black'
                                                            }`}
                                                      >
                                                            {name}
                                                      </button>
                                                      {
                                                            isActive &&
                                                            <div className='bg-black absolute h-[2px] w-full bottom-0 left-0' />
                                                      }
                                                </div>
                                          )
                                    })
                              }
                        </div>
                  </div>
            </div>
      )
}

export default TabHeader