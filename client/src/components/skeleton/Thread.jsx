import React from 'react'
import Skeleton from 'react-loading-skeleton'

const ThreadSkeleton = () => {
      return (

            <div className="py-3 flex-1 space-y-6  px-4">
                  {
                        new Array(10).fill(null).map(() => (
                              <div className='w-full group relative border-b border-border pb-1 last:border-0 flex'>
                                    <div className=' w-full'>
                                          <div>
                                                <Skeleton className='w-[5rem] h-[5rem] rounded-md bg-slate-300/30 overflow-hidden relative' />
                                          </div>
                                          <div className=''>
                                                <div className='flex gap-2 items-center'>
                                                      <Skeleton className='rounded-md bg-slate-300/30 overflow-hidden relative' />
                                                      <Skeleton className='rounded-md bg-slate-300/30 overflow-hidden relative' />
                                                      {/* <p className='text-[12px] text-slate-950/50'>{timeAgo(createdAt)}</p> */}
                                                </div>
                                                <Skeleton />
                                          </div>
                                    </div>
                              </div>
                        ))
                  }
            </div>
      )
}

export default ThreadSkeleton