import React from 'react'

const Banner = ({ title = "Find your community <br/> on Campuz Connect", subtitle = "From entertainment to resource sharing and education." }) => {
      return (
            <div className='flex flex-col gap-3 justify-center w-full px-6 h-[18rem] bg-gradient-to-r from-violet-300/50 via-violet-200/50  to-transparent'>
                  <h1 className='text-5xl text-slate-950/70 font-extrabold'>{title.split(" ").map(e => (e == "<br/>" ? <br /> : e + " "))}</h1>
                  <p className='text-neutral-900/50'>{subtitle}</p>
            </div>
      )
}

export default Banner