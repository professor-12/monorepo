import React from 'react'
import Banner from '../../../Banner'
import { useMarketPlace } from '@//store/MarketPlaceProvider'
import { BASE_URL, tabList } from '@//lib/utils'
import TabHeader from '../header'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/hooks/auth'

import MarketNav from './MarketNav'
import Home from './Home'
import LikedPost from './LikedPost'
import MentionPost from './MentionPost'
import MyPost from './MyPost'



const MarketPlace = () => {
      const { tab } = useMarketPlace()

      return (
            <div className='w-full h-full flex'>
                  <aside className='w-[20rem] h-full'>
                        <div className='border-b  border-border w-full h-12 flex items-center text-lg fontfont-medium p-2 px-4'>
                              Discover
                        </div>
                        <MarketNav />
                  </aside>
                  <main className='flex-1 relative  h-[calc(100dvh-32px)] overflow-y-scroll bg-white'>
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

