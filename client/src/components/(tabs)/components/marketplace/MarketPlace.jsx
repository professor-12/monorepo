import React from 'react'
import { useMarketPlace } from '@//store/MarketPlaceProvider'
import { tabList } from '@//lib/utils'
import TabHeader from '../header'

import MarketNav from './MarketNav'
import Home from './Home'
import LikedPost from './LikedPost'
import MentionPost from './MentionPost'
import MyPost from './MyPost'



const MarketPlace = () => {
      const { tab } = useMarketPlace()

      return (
            <div className='w-full h-full flex flex-col md:flex-row'>
                  <aside className='w-full md:w-[20rem] h-auto md:h-full border-b md:border-b-0 md:border-r border-border'>
                        <div className='border-b border-border w-full h-12 flex items-center text-lg font-medium p-2 px-4'>
                              Discover
                        </div>
                        <div className='max-md:hidden'>
                              <MarketNav />
                        </div>
                        {/* Mobile navigation */}
                        <div className='md:hidden p-2'>
                              <div className='flex gap-2 overflow-x-auto'>
                                    {tabList.map((tabItem, index) => (
                                          <button
                                                key={index}
                                                className={`px-3 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                                                      tab === tabItem ? 'bg-[#5764F0] text-white' : 'bg-gray-100 text-gray-700'
                                                }`}
                                                onClick={() => {
                                                      // Add tab switching logic here
                                                }}
                                          >
                                                {tabItem}
                                          </button>
                                    ))}
                              </div>
                        </div>
                  </aside>
                  <main className='flex-1 relative h-[calc(100dvh-32px)] md:h-[calc(100dvh-32px)] overflow-y-scroll bg-white'>
                        <TabHeader tabList={tabList} />
                        <>
                              {tab == "Home" && <Home />}
                              {tab == "Liked Post"
                                    &&
                                    <LikedPost />
                              }
                              {
                                    "Mentions" == tab &&
                                    <MentionPost />
                              }
                              {
                                    "My Post" == tab &&
                                    <MyPost />
                              }
                        </>

                  </main>
            </div>
      )
}

export default MarketPlace

