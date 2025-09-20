import React from 'react'
import MarketNav from '../marketplace/MarketNav'
import TabHeader from '../header'
import { BASE_URL, tabList } from '@//lib/utils'
import Banner from '@//components/Banner'
import { useQuery } from '@tanstack/react-query'
import EventCard from './component/eventcard'
import EventSkeleton from './component/eventSkeleton'

const Event = () => {
      const { data, isLoading } = useQuery({
            queryKey: ["fetch-event"], queryFn: async () => {
                  const event = await fetch(BASE_URL + "/event")
                  const data = await event.json()
                  return data.data
            },
            initialData: [],
      })

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
                        <Banner title='Events'></Banner>
                        {
                              isLoading ? <div className='p-6 grid-cols-3 max-md:grid-cols-2 gap-5 grid'>
                                    {[...Array(10)]?.map((e) => {
                                          return <EventSkeleton {...e} key={e.id} />
                                    })}
                              </div> : <div className='p-6 grid-cols-3 max-md:grid-cols-2 gap-5 grid'>
                                    {data?.map((e) => {
                                          return <EventCard {...e} key={e.id} />
                                    })}
                              </div>
                        }

                  </main>
            </div>
      )
}

export default Event