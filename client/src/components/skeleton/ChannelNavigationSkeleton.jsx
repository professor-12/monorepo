import React from 'react'
import Skeleton from 'react-loading-skeleton'

const ChannelNavigationSkeleton = () => {
      return (
            <div className='space-y-5'>
                  {
                        new Array(8).fill(null).map((_, indx) => (
                              <div key={indx} className='m-2 hover:shadow   rounded-md overflow-hidden'>
                                    <Skeleton className="w-full h-[2rem]">
                                    </Skeleton>

                              </div>
                        ))
                  }

            </div >
      )
}

export default ChannelNavigationSkeleton