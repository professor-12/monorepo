
import ThreadModal from '@//components/modal/ThreadModal';
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';


export const timeAgo = (iso) => {
      const diff = Date.now() - new Date(iso).getTime();
      const minutes = Math.floor(diff / 60000);
      if (minutes < 1) return "just now";
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
};



const Thread = ({ channel }) => {
      const [openThread, setOpenThread] = useState(null)
      const isAnonymous = channel?.name == "anonymous"
      const ref = useRef()

      useEffect(() => {
            ref?.current?.scrollIntoView({ behavior: "smooth" });
      }, [channel])

      return (
            <div className="py-3 flex-1 space-y-6  px-4">
                  {
                        channel?.messages?.filter(a => a.threadRootId === null).map((item) => {
                              return <MessageItem openThread={(d) => setOpenThread(d)}  {...item} isAnonymous={isAnonymous} />
                        })
                  }
                  {openThread && <ThreadModal handleClose={() => { setOpenThread(null) }} thread={openThread} />}
                  <div ref={ref}></div>

            </div>
      )
}

export default Thread



export const MessageItem = (props) => {

      const { content, threadReplies: replies, author, createdAt, isAnonymous, openThread } = props

      return (
            <div className='w-full group relative border-b border-border pb-1 last:border-0 flex'>
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
                              <span onClick={() => openThread(props)} className={`text-xs cursor-pointer transition-all duration-300 ${replies?.length <= 0 && 'opacity-0'} group-hover:opacity-100 font-medium text-primary tracking-tight leading-0.5`}>
                                    {replies?.length > 0 ? replies?.length + " " + `repl${replies?.length > 1 ? 'ies' : "y"}` : "Reply"}
                              </span>
                        </div>
                  </div>
            </div>
      )
}


