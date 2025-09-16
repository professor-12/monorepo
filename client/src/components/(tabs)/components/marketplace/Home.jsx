import Banner from '@//components/Banner'
import { useAuth } from '@//hooks/auth'
import { useMarketPlace } from '@/store/MarketPlaceProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { BASE_URL } from '@/lib/utils'
import Modal from '@//components/ui/Modal'
import CommentSection from './CommentSection'
import PostSkeleton from '@//components/skeleton/PostSkeleton'

const Home = () => {
      const router = useNavigate()
      const queryClient = useQueryClient()
      const { data, handleOpenComment, openComment } = useMarketPlace()

      const { user } = useAuth()
      const navigateToProfile = (name) => {
            router?.(`/profile?xnd=${name}`)
      }
      const likeMutation = useMutation({
            mutationFn: async (postId) => {
                  const res = await fetch(BASE_URL + "/post/like/" + postId, {
                        method: "POST",
                        headers: {
                              "Authorization": "Bearer " + user?.uid,
                        },
                  });
                  return res.json();
            },

            onMutate: async (postId) => {
                  await queryClient.cancelQueries(["market"]);

                  const prevData = queryClient.getQueryData(["market"]);

                  queryClient.setQueryData(["market"], (_data) => {
                        if (!_data) return _data;
                        const newPosts = [..._data];
                        const postIndex = newPosts.findIndex((p) => p.id === postId);
                        if (postIndex === -1) return _data;

                        const post = { ...newPosts[postIndex] };
                        const alreadyLiked = post.reactions.some(
                              (r) => r.user.firebaseUid === user.uid
                        );

                        let updatedReactions = post.reactions;
                        if (alreadyLiked) {
                              updatedReactions = post.reactions.filter(
                                    (r) => r.user.firebaseUid !== user.uid
                              );
                        } else {
                              // add temporary like
                              updatedReactions = [
                                    ...post.reactions,
                                    { id: "temp-" + Date.now(), user: { firebaseUid: user.uid } },
                              ];
                        }

                        newPosts[postIndex] = { ...post, reactions: updatedReactions };

                        return newPosts
                  });

                  return prevData;
            },

            onSuccess: (res, postId) => {
                  queryClient.refetchQueries(["market"])
            },


            onError: (err, _postId, context) => {
                  if (context?.prevData) {
                        queryClient.setQueryData(["market"], context.prevData);
                  }
            },
            onSettled: () => {
                  queryClient.invalidateQueries(["market"]);
            },
      })
      const handleLike = (id) => {
            likeMutation.mutate(id)
      }

      const handleComment = () => { }
      const handleFavourite = () => { }
      return (
            <>
                  <Banner></Banner>
                  <div className='w-full relative pt-5 pb-6'>
                        <div className='w-full px-2 sm:px-4 md:px-5'>
                              <div className='px-2 sm:px-4 w-full h-12 flex items-center text-lg font-medium'>
                                    <h1 className='font-medium'>Featured Posts</h1>
                              </div>
                              {
                                    !data?.isLoading ?
                                          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4'>
                                                {
                                                      openComment &&
                                                      <Modal>
                                                            <div className='w-full relative max-w-xl max-h-[80dvh] overflow-y-hidden overflow-x-hidden h-auto p-4 sm:p-6 px-4 sm:px-8 rounded-3xl bg-white pb-4 mobile-modal'>

                                                                  <div className='flex pb-5 items-center justify-between'>
                                                                        <h1 className='text-lg font-semibold'>Comment Section</h1>
                                                                        <div className='w-full relative'>
                                                                              <div className='flex justify-end'>
                                                                                    <button onClick={() => { handleOpenComment(null) }} className='absolute top-0 right-0 p-2 rounded-full hover:bg-gray-100 transition-colors'>
                                                                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                                                    </button>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                                  <CommentSection postId={openComment} />
                                                            </div>
                                                      </Modal>
                                                }
                                                {
                                                      data?.data && data?.data?.map((item) => {
                                                            const isLike = item?.reactions?.some((reaction) => (reaction.user?.firebaseUid == user?.uid))
                                                            return (
                                                                  <div key={item.id} className='hover:shadow-lg transition-shadow duration-200 border border-border rounded-lg overflow-hidden bg-white'>
                                                                        <div style={{ backgroundImage: `url('${item?.thumbnail}')` }} className="w-full h-[8rem] sm:h-[9rem] bg-cover bg-center relative">
                                                                              <div onClick={() => { navigateToProfile(item?.author?.profile?.displayName) }} style={{ backgroundImage: `url('${item?.author?.profile?.picture}')` }} className={`absolute top-[calc(100%-24px)] left-3 sm:left-4 cursor-pointer w-10 h-10 sm:w-12 sm:h-12 bg-cover bg-center ring-white ring-2 sm:ring-4 rounded-lg sm:rounded-xl`}></div>
                                                                        </div>
                                                                        <div className='p-3 sm:p-4 pt-8 sm:pt-10 space-y-2'>
                                                                              <div className='min-h-[4rem] sm:min-h-[5.5rem]'>
                                                                                    <h1 onClick={() => { navigateToProfile(item?.author?.profile?.displayName) }} className='font-medium hover:text-primary hover:underline cursor-pointer text-sm sm:text-base mb-1'>{item?.author?.profile?.displayName}</h1>
                                                                                    <p className='text-xs sm:text-sm line-clamp-4 sm:line-clamp-6 text-gray-600 leading-relaxed'>{item?.content}</p>
                                                                              </div>
                                                                              <div className='flex space-x-2 sm:space-x-3 pt-4 sm:pt-6 justify-start items-center'>
                                                                                    {/* Reaction */}
                                                                                    <button disabled={likeMutation.isPending} onClick={() => handleLike(item.id)} className='py-1 px-2 cursor-pointer text-sm flex items-center gap-1 rounded-md hover:bg-gray-100 transition-colors touch-target'>
                                                                                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={isLike ? "black" : "none"} viewBox="0 0 18 18" class="h-[18px] w-[18px]"><path stroke="black" stroke-linejoin="round" stroke-width="1" d="M9 3.991c4.878-4.83 13.24 4.14 0 11.384C-4.24 8.131 4.122-.838 9 3.991Z"></path></svg>
                                                                                          {
                                                                                                item?.reactions?.length > 0 && <span className='font-normal text-xs'>{item?.reactions?.length}</span>
                                                                                          }
                                                                                    </button>

                                                                                    <span className='font-bold text-sm'>
                                                                                          <button onClick={() => { handleOpenComment(item?.id) }} className='cursor-pointer gap-1 text-sm flex items-center rounded-md py-1 px-2 hover:bg-gray-100 transition-colors touch-target'>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-dashed-icon lucide-message-circle-dashed"><path d="M10.1 2.182a10 10 0 0 1 3.8 0" /><path d="M13.9 21.818a10 10 0 0 1-3.8 0" /><path d="M17.609 3.72a10 10 0 0 1 2.69 2.7" /><path d="M2.182 13.9a10 10 0 0 1 0-3.8" /><path d="M20.28 17.61a10 10 0 0 1-2.7 2.69" /><path d="M21.818 10.1a10 10 0 0 1 0 3.8" /><path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" /><path d="m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98" /></svg><span className='font-normal text-xs'>{item?.comments?.length}</span>
                                                                                          </button>
                                                                                    </span>
                                                                                    <span className='font-bold flex items-center gap-0.5 text-sm'>
                                                                                          <button className='flex items-center gap-0.5 py-1 px-2 hover:bg-gray-100 transition-colors rounded-md touch-target'>
                                                                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V13.5C3 13.6818 3.09864 13.8492 3.25762 13.9373C3.41659 14.0254 3.61087 14.0203 3.765 13.924L7.5 11.5896L11.235 13.924C11.3891 14.0203 11.5834 14.0254 11.7424 13.9373C11.9014 13.8492 12 13.6818 12 13.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5Z" fill="" strokeWidth={"1"} stroke='currentColor' fill-rule="evenodd" clip-rule="evenodd"></path></svg><span className='font-normal text-xs'>8</span>
                                                                                          </button>
                                                                                    </span>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            )
                                                      }
                                                      )
                                                }
                                          </div> :
                                          <PostSkeleton />
                              }

                        </div>
                  </div>
            </>
      )
}

export default Home