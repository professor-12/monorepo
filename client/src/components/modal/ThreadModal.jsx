import React from 'react'
import Modal from '../ui/Modal'
import { Textarea } from '../ui/textarea'
import { timeAgo } from '../(tabs)/components/channels/Thread'
import { CancelSvg } from './add-post'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Fragment } from 'react'
import { BASE_URL } from '@//lib/utils'
import { useAuthContext } from '../AuthProvider'
import { useChannel } from '@//store/ChannelProvider'
import useProfile from '@//hooks/useProfile'

const ThreadModal = ({ thread, handleClose, isAnonymous }) => {
      const { activeChannelId } = useChannel()
      const queryClient = useQueryClient()
      const { user } = useAuthContext()
      const { data: profile } = useProfile()
      const channelData = queryClient.getQueryData(["channel"])
      const freshThread = channelData
            ?.find((ch) => ch.id === activeChannelId)
            ?.messages.find((msg) => msg.id === thread.id)

      const { author, content, threadReplies: replies = [], createdAt, channelId, id: messageId } =
            freshThread || thread

      const [reply, setReply] = useState("")
      const { mutate, error } = useMutation({
            mutationKey: ["reply", channelId, messageId],
            mutationFn: async ({ attachments }) => {
                  // return;
                  const res = await fetch(
                        `${BASE_URL}/channel/reply/${messageId}`,
                        {
                              method: "POST",
                              headers: { "Content-Type": "application/json", Authorization: "Bearer " + user?.uid },
                              body: JSON.stringify({ content: reply, attachments }),
                        }
                  );

                  if (!res.ok) {
                        throw new Error("Failed to send reply");
                  }

                  const data = await res.json()

                  return data
            },
            onSuccess: (data) => {

            },
            onMutate: async (newReply) => {
                  await queryClient.cancelQueries(["channel"]);

                  const previousChannels = queryClient.getQueryData(["channel"]);

                  queryClient.setQueryData(["channel"], (oldData) => {
                        if (!oldData) return oldData;

                        const a = oldData.map((channel) => {
                              if (channel.id !== activeChannelId) return channel;
                              return {
                                    ...channel,
                                    messages: channel.messages.map((msg) => {
                                          if (msg.id !== messageId) return msg;
                                          return {
                                                ...msg,
                                                threadReplies: [
                                                      ...(msg.threadReplies || []),
                                                      {
                                                            id: Date.now().toString(), // temp id
                                                            content: reply,
                                                            createdAt: new Date().toISOString(),
                                                            author: {
                                                                  profile: profile.data,
                                                            },
                                                            isAnonymous,
                                                      },
                                                ],
                                          };
                                    }),
                              };
                        });
                        return a
                  });
                  // setReply("")
                  return previousChannels;
            },

            onError: (err, newReply, context) => {
                  queryClient.setQueryData(["channel"], context.previousChannels);
            },

            onSettled: () => {
                  queryClient.invalidateQueries(["channel"]);
                  setReply("")
            }

      });

      return (
            <Modal>
                  <div className='w-[80%] cursor-default max-w-xl p-5 max-h-[80vh] overflow-auto rounded-2xl bg-white'>
                        <div className='flex justify-between'>
                              <h1 className='text-lg'>Thread</h1>
                              <div className='cursor-pointer'>
                                    <CancelSvg onClick={handleClose} className="cursor-pointer" />
                              </div>
                        </div>
                        <div className='py-8 space-y-8'>
                              <div className='flex border-b pb-4 border-border gap-2 max-w-[40rem] w-full'>
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

                                          return (
                                                <Fragment key={index}>
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
                                                </Fragment>
                                          )
                                    })
                              }
                        </div>
                        <div className='flex'>
                              <Textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Reply to a Thread" />
                              <div onClick={mutate} className='cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 24 24" fill="#5764F0" stroke="white" strokeWidth="1.5s" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal-icon lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" /><path d="M6 12h16" /></svg>
                              </div>
                        </div>
                  </div>
            </Modal>
      )
}

export default ThreadModal