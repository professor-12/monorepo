
import React from 'react'
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
      const isAnonymous = channel?.name == "anonymous"
      const ref = useRef()
      
      useEffect(() => {
            ref?.current?.scrollIntoView({ behavior: "smooth" });
      }, [channel])

      return (
            <div className="py-3 flex-1 space-y-6  px-4">
                  {
                        channel?.messages?.map((item) => {
                              return <MessageItem {...item} isAnonymous={isAnonymous} />
                        })
                  }
                  <div ref={ref}></div>

            </div>
      )
}

export default Thread


const avatar = ["https://i.pinimg.com/1200x/b2/fb/f6/b2fbf655c44e8f720bdaef7bb502d84e.jpg", "https://i.pinimg.com/736x/88/69/de/8869de3990901fc40f8f74a93c18aaff.jpg", "https://i.pinimg.com/736x/56/2d/d5/562dd5f7d58973d212493630c5a72960.jpg"]

export const MessageItem = (props) => {

      const { content, threadReplies: replies, author, createdAt, isAnonymous } = props

      return (
            <div className='w-full border-b border-border pb-4 last:border-0 flex'>
                  <div className='flex  gap-2 max-w-[40rem] w-full'>
                        <div>
                              <div className='size-[2.5rem] rounded-md bg-slate-300/30 overflow-hidden relative'>
                                    <img src={isAnonymous ? avatar[Math.round(Math.random() * 2)] : author?.profile?.picture} className='w-full h-full top-0 bottom-0 inset-0' />
                              </div>
                        </div>
                        <div className=''>
                              <div className='flex gap-2 items-center'>
                                    <p className='font-medium leading-0'>{!isAnonymous && author?.profile?.displayName}</p>
                                    <p className='text-[12px] text-slate-950/50'>{timeAgo(createdAt)}</p>
                              </div>
                              <div className='text-slate-800'>{content}</div>
                              <span className='text-sm font-medium text-primary/70 tracking-tight leading-0.5'>
                                    {replies?.length > 0 && replies?.length + " " + `repl${replies?.length > 1 ? 'ies' : "y"}`}
                              </span>
                        </div>
                  </div>
            </div>
      )
}