import React from 'react'
import Modal from '../ui/Modal'
import { Textarea } from '../ui/textarea'
import { timeAgo } from '../(tabs)/components/channels/Thread'
import { CancelSvg } from './add-post'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const ThreadModal = ({ thread, handleClose }) => {
      console.log(thread)
      const { author, content, threadReplies: replies, isAnonymous, createdAt, channelId, messageId } = thread


      const [repy, setReply] = useState("")

      const { data, mutate, isPending, error } = useMutation({
            mutationKey: ["reply", channelId, messageId],
            mutationFn: async ({ repy, attachments }) => {
                  const res = await fetch(
                        `${BASE_URL}/channels/${channelId}/messages/${messageId}/reply`,
                        {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ content: reply, attachments }),
                        }
                  );

                  if (!res.ok) {
                        throw new Error("Failed to send reply");
                  }

                  return res.json();
            },
            onSuccess: (data) => {
                  // ✅ Optimistic update: refresh thread
                  queryClient.invalidateQueries({
                        queryKey: ["thread", messageId],
                  });
            },
      });


      return (
            <Modal>
                  <div className='w-[80%] cursor-default max-w-2xl p-5 max-h-[80vh] overflow-auto rounded-2xl bg-white'>
                        <div className='flex justify-between'>
                              <h1 className='text-lg'>Thread</h1>
                              <div className='cursor-pointer'>
                                    <CancelSvg onClick={handleClose} className="cursor-pointer" />
                              </div>
                        </div>
                        <div className='py-8 space-y-8'>
                              <div className='flex  gap-2 max-w-[40rem] w-full'>
                                    <div>
                                          <div className='size-[2.5rem] rounded-md bg-slate-300/30 overflow-hidden relative'>
                                                <img src={author?.profile?.picture} className='w-full h-full top-0 bottom-0 inset-0' />
                                          </div>
                                    </div>
                                    <div className=''>
                                          <div className='flex gap-2 items-center'>
                                                <p className='font-medium leading-0'>{!isAnonymous && author?.profile?.displayName}</p>
                                                <p className='text-[12px] text-slate-950/50'>{timeAgo(createdAt)}</p>
                                          </div>
                                          <div className='text-slate-800'>{content}</div>
                                          <span onClick={() => openThread(props)} className='text-xs cursor-pointer transition-all duration-300 hidden group-hover:flex pt-4 font-medium text-primary tracking-tight leading-0.5'>
                                                {replies?.length > 0 ? replies?.length + " " + `repl${replies?.length > 1 ? 'ies' : "y"}` : "Reply"}
                                          </span>
                                    </div>
                              </div>
                              {
                                    replies.map((e, index) => {
                                          const { author, content } = e
                                          console.log(e)
                                          return (
                                                <>
                                                      <div className='flex  gap-2 max-w-[40rem] w-full'>
                                                            <div>
                                                                  <div className='size-[2.5rem] rounded-md bg-slate-300/30 overflow-hidden relative'>
                                                                        <img src={author?.profile?.picture} className='w-full h-full top-0 bottom-0 inset-0' />
                                                                  </div>
                                                            </div>
                                                            <div className=''>
                                                                  <div className='flex gap-2 items-center'>
                                                                        <p className='font-medium leading-0'>{!isAnonymous && author?.profile?.displayName}</p>
                                                                        <p className='text-[12px] text-slate-950/50'>{timeAgo(createdAt)}</p>
                                                                  </div>
                                                                  <div className='text-slate-800'>{content}</div>
                                                                  <span onClick={() => openThread(props)} className='text-xs cursor-pointer transition-all duration-300 hidden group-hover:flex pt-4 font-medium text-primary tracking-tight leading-0.5'>
                                                                        {replies?.length > 0 ? replies?.length + " " + `repl${replies?.length > 1 ? 'ies' : "y"}` : "Reply"}
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </>
                                          )
                                    })
                              }
                        </div>
                        <div className='flex'>
                              <Textarea placeholder="Reply to a Thread" />
                              <div className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 24 24" fill="#5764F0" stroke="white" strokeWidth="1.5s" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal-icon lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" /><path d="M6 12h16" /></svg>
                              </div>
                        </div>
                  </div>
            </Modal>
      )
}

export default ThreadModal