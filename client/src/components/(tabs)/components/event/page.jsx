import React from 'react'
import MarketNav from '../marketplace/MarketNav'
import TabHeader from '../header'
import { tabList } from '@//lib/utils'
import Banner from '@//components/Banner'

const Event = () => {
      return (
            <div className='w-full h-full flex'>
                  <aside className='w-[20rem] max-md:hidden h-full'>
                        <div className='border-b  border-border w-full h-12 flex items-center text-lg fontfont-medium p-2 px-4'>
                              Events
                        </div>
                        {/* <MarketNav /> */}
                  </aside>
                  <main className='flex-1 relative  h-[calc(100dvh-32px)] overflow-y-scroll bg-white'>
                        <TabHeader tabList={tabList} />
                        <Banner title='Coming soon'></Banner>

                  </main>
            </div>
      )
}

export default Event