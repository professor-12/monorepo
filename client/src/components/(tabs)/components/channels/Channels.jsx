import Banner from '@/components/Banner'
import React from 'react'
import Thread from './Thread'
import { Textarea } from '../../../ui/textarea'
import { useChannel } from '@//store/ChannelProvider'
import TabHeader from '../header'
import { BASE_URL, tabList } from '@//lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@//hooks/auth'
import { useState } from 'react'
import { useRef } from 'react'
import useProfile from '@//hooks/useProfile'
import ReplyThread from './ReplyThread'




export const Channel = () => {
      const [content, setContent] = useState("")
      const { data: profile } = useProfile()
      const queryClient = useQueryClient()
      const user = useAuth()
      const { channelData, activeChannelId, handleChangeChannel } = useChannel()
      const { data = [] } = channelData;
      const activeChannel = data?.find?.((a) => a.id == activeChannelId)
      const senndMessage = useMutation({
            mutationFn: async () => {
                  console.log(content);
                  if (content.trim("").length == 0) return;
                  const req = await fetch(`${BASE_URL}/message/send?channelId=${activeChannelId}`, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                              Authorization: "Token " + user?.user?.uid,
                        },
                        body: JSON.stringify({ content }),
                  });
                  const res = await req.json()
                  return res?.data
            },
            mutationKey: ["send-message"],
            onMutate:
                  (data) => {
                        if (content.trim("").length == 0) return;
                        const generateFakeMessage = { id: "your-id-random", content, author: { profile: { displayName: profile?.data?.displayName, picture: profile?.data?.picture } }, createdAt: new Date() }
                        queryClient.setQueryData(["channel"], (oldData) => {
                              const nes = [...oldData]
                              const findIndex = oldData.findIndex((e) => e.id == activeChannelId)
                              nes[findIndex] = { ...nes[findIndex], messages: [...nes[findIndex].messages, generateFakeMessage] }
                              return nes
                        })
                  }, onSuccess: () => {
                        queryClient.refetchQueries(["channel"])
                        setContent("")
                  },
            onError: (err, _postId, context) => {
                  if (context?.prevData) {
                        queryClient.setQueryData(["market"], context.prevData);
                  }
            },
      })

      return (
            <div className='w-full relatives h-full flex'>
                  <aside className='w-[20rem] min-w-[20rem] h-full'>
                        <div className='border-b  border-border w-full h-12 flex items-center text-lg fontfont-medium p-2 px-4'>
                              Channels
                        </div>
                        <ul className="w-full space-y-2 p-4">
                              <p className='text-xs py-1 font-mono text-slate-600/70'>Public channels</p>
                              {data?.map((a) => {
                                    const isActive = activeChannel?.id == a?.id
                                    return <li onClick={() => handleChangeChannel(a?.id)} className={`space-x-3 p-2 cursor-pointer transition-colors duration-400  hover:bg-[#E4E4E7] rounded-md px-3 flex items-center ${isActive && "bg-[#E7E7E9] text-black hover:bg-[#E7E7E9]"}`}><span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hash-icon lucide-hash"><line x1="4" x2="20" y1="9" y2="9" /><line x1="4" x2="20" y1="15" y2="15" /><line x1="10" x2="8" y1="3" y2="21" /><line x1="16" x2="14" y1="3" y2="21" /></svg></span><span>{a?.name}</span></li>
                              })}
                        </ul>
                  </aside>
                  <div className='flex flex-1'>
                        <div className='w-full flex-1 relative'>
                              <main className='flex-1 relative pb-[40px] h-[calc(100vh-32px)]   overflow-y-scroll bg-white'>
                                    <div>
                                          <TabHeader tabList={tabList} />
                                          <Banner title={"#" + activeChannel?.name} subtitle=""></Banner>
                                          <div className='w-full  h-full pt-5'>
                                                <Thread channel={{ ...activeChannel }} />
                                          </div>
                                    </div>
                              </main>
                              <div className='absolute gap-2 mt-3 flex bg-white bottom-0 pb-4 left-4  right-4'>
                                    <Textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder="Message #channel" className={"border-border py-2"} />
                                    <div className='cursor-pointer'>
                                          <svg onClick={() => senndMessage.mutate(activeChannel)} xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 24 24" fill="#5764F0" stroke="white" strokeWidth="1.5s" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal-icon lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" /><path d="M6 12h16" /></svg>
                                    </div>
                              </div>
                        </div>
                        {/* <ReplyThread /> */}
                  </div>
            </div >
      )
}




