import React from 'react'
import Skeleton from 'react-loading-skeleton'

const PostSkeleton = () => {
      return (
            <div className='grid gap-4 max-md:grid-cols-2 grid-cols-3'>
                  {
                        new Array(6).fill(null).map((_, indx) => (
                              <div key={indx} className='rounded-md overflow-hidden'>
                                    <Skeleton className="w-full h-[8rem] bg-cover bg-[6px]">
                                    </Skeleton>
                                    <div className='p-3 pt-10 space-y-1'>
                                          <div className='h-[5.8rem]'>
                                                <Skeleton className='' />
                                                <p className='text-xs text-gray-600'></p>
                                          </div>
                                          <div className='flex space-x-3 pt-10  justify-start items-center'>
                                                {/* Reaction */}
                                                {/* <button disabled={likeMutation.isPending} onClick={() => handleLike(item.id)} className='py-1 cursor-pointer text-sm flex items-center gap-1 rounded-md'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={isLike ? "black" : "none"} viewBox="0 0 18 18" class="h-[18px] w-[18px]"><path stroke="black" stroke-linejoin="round" stroke-width="1" d="M9 3.991c4.878-4.83 13.24 4.14 0 11.384C-4.24 8.131 4.122-.838 9 3.991Z"></path></svg>

                                    </button> */}

                                                {/* Comments */}
                                                {/* <span className='font-bold text-sm'>
                                          <button onClick={() => { handleOpenComment(item?.id) }} className='cursor-pointer gap-1 text-sm text flex items-center rounded-md'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className='' width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-dashed-icon lucide-message-circle-dashed"><path d="M10.1 2.182a10 10 0 0 1 3.8 0" /><path d="M13.9 21.818a10 10 0 0 1-3.8 0" /><path d="M17.609 3.72a10 10 0 0 1 2.69 2.7" /><path d="M2.182 13.9a10 10 0 0 1 0-3.8" /><path d="M20.28 17.61a10 10 0 0 1-2.7 2.69" /><path d="M21.818 10.1a10 10 0 0 1 0 3.8" /><path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" /><path d="m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98" /></svg><span className='font-normal text-xs'>{item?.comments?.length}</span>
                                          </button>
                                    </span> */}

                                          </div>
                                    </div>
                              </div>
                        ))
                  }

            </div >
      )
}

export default PostSkeleton