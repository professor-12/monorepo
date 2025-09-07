import Banner from '@/components/Banner'
import React from 'react'
import Thread from './Thread'
import { Textarea } from '../../../ui/textarea'
import { useChannel } from '@//store/ChannelProvider'
import TabHeader from '../header'
import { BASE_URL, tabList } from '@//lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useProfile from '@//hooks/useProfile'
import { useAuthContext } from '@//components/AuthProvider'
import AddMember from '@//components/modal/add-member'




export const Channel = () => {
      const [content, setContent] = useState("")
      const { data: profile } = useProfile()
      const queryClient = useQueryClient()
      const user = useAuthContext()
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

      const [addUser, setAddUser] = useState(null)

      return (
            <div className='w-full relatives h-full flex'>
                  <aside className='w-[20rem] min-w-[20rem] h-full'>
                        <div className='border-b  border-border w-full h-12 flex items-center text-lg fontfont-medium p-2 px-4'>
                              Channels
                        </div>
                        {
                              addUser &&
                              <AddMember cancel={() => { setAddUser(null) }} channelId={addUser.id} />
                        }
                        <ul className="w-full space-y-2 p-4">
                              {(Array.isArray(data) ? data : [])?.map((a) => {
                                    const isActive = activeChannel?.id == a?.id
                                    const isOwner = a.createdBy.firebaseUid == user?.user?.uid && "group-hover:flex"
                                    return <li onClick={() => handleChangeChannel(a?.id)} className={`space-x-3 relative group p-2 cursor-pointer transition-colors duration-400  hover:bg-[#E4E4E7] rounded-md px-3 flex items-center ${isActive && "bg-[#E7E7E9] text-black hover:bg-[#E7E7E9]"}`}><span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" stroke-linejoin="round" class="lucide lucide-hash-icon lucide-hash"><line x1="4" x2="20" y1="9" y2="9" /><line x1="4" x2="20" y1="15" y2="15" /><line x1="10" x2="8" y1="3" y2="21" /><line x1="16" x2="14" y1="3" y2="21" /></svg></span><span className='flex gap-3 items-center'>
                                          <div onClick={(e) => { e.stopPropagation(); setAddUser(a) }} className={`hidden absolute  right-3 ${isOwner}`}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg></div>
                                          <span>
                                                {a?.name}
                                          </span> {a.visibility == "PRIVATE" &&
                                                <Lock />
                                          }
                                    </span></li>
                              })}
                        </ul>
                  </aside>
                  <div className='flex flex-1'>
                        <div className='w-full flex-1 relative'>
                              <main className='flex-1 relative pb-[40px] h-[calc(100vh-32px)]   overflow-y-scroll bg-white'>
                                    <div>
                                          <TabHeader tabList={tabList} />
                                          <Banner title={"#" + activeChannel?.name || ""} subtitle={"This is the very beginning of " + (activeChannel?.name || "") + " channel"}></Banner>
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
                  </div>
            </div >
      )
}





const Lock = ({ className, ...props }) => {
      return <svg  {...props} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" className={"lucide lucide-lock-icon lucide-lock " + className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
}