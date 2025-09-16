import React from 'react'
import Modal from '../ui/Modal'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Calendar24 } from '../ui/date-picker'
import { Button } from '../ui/button'
import { useRef } from 'react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { BASE_URL } from '@//lib/utils'
import { useAuthContext } from '../AuthProvider'


const images = ["https://i.pinimg.com/736x/43/e4/44/43e444b1ebd4dcf583f02d93833fde4e.jpg", "https://i.pinimg.com/736x/92/51/ed/9251edcc67ae84e876d7d203792e5bf1.jpg", "https://i.pinimg.com/736x/e7/1e/2f/e71e2fac8f9d7492cfbc57a0f730adda.jpg", "https://i.pinimg.com/736x/54/50/93/545093c6a7201c01dbe2df4dea4881f0.jpg", "https://i.pinimg.com/1200x/78/4a/37/784a374d790ce628b0c7169bec029dc4.jpg"]




const CreateEvent = () => {
      const [image, setImage] = useState(() => images[Math.floor(Math.random() * images.length)])
      const imageRef = useRef()
      const { user } = useAuthContext()
      const [form, setForm] = useState({})

      const [startDate, setStartDate] = React.useState(undefined)
      const [endDate, setEndDate] = React.useState(undefined)

      const event = useMutation({
            mutationFn: async () => {
                  const _form = new FormData()
                  form?.entries?.forEach(e => {
                        console.log(e)
                  })
                  await fetch(BASE_URL + "/event", {
                        method: "POST", body: _form, headers: {
                              "Authorization": "Bearer " + user.uid
                        }
                  })
                  console.log(form, startDate, endDate)
            }
      })


      const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
      }
      return (
            <Modal>
                  <div className='bg-white w-full max-w-2xl p-2 rounded-lg flex cursor-default max-md:flex-col max-md:items-center pt-6 max-h-[80dvh] overflow-y-scroll'>

                        <div>
                              <div onClick={() => {
                                    imageRef.current?.click()
                              }} className='size-[12rem] shadow relative cursor-pointer  rounded-2xl object-center bg-center bg-slate-300/70 overflow-hidden'>
                                    <img className='absolute top-0 bottom-0 right-0 left-0 h-full w-full object-cover inset-0' src={image} alt="" />
                                    <input onChange={(e) => {
                                          setImage(URL.createObjectURL(e.target.files[0]))
                                    }} ref={imageRef} accept='image/*' type="file" className='hidden' />
                              </div>
                        </div>
                        <div className='flex-1  px-6 space-y-5 p-4'>
                              <div>
                                    <Input name="title" onChange={handleChange} placeholder="Event name" className={"!border-none focus:border-0 !focus-visible:border-0 !focus-visible:outline-0 !focus:outline-none w-full !text-3xl"} />
                              </div>
                              <div className='flex border-b pb-4  justify-between'>
                                    <p className='text-lg'>Start</p> <Calendar24 date={startDate} setDate={setStartDate} />
                              </div>
                              <div className='flex justify-between'>
                                    <p className='text-lg'>End</p> <Calendar24 date={endDate} setDate={setEndDate} />
                              </div>
                              <Textarea name="description" onChange={handleChange} placeholder="Description" />
                              <Input onChange={handleChange} name="link" className={""} placeholder="Location Link" />
                              <Button onClick={event.mutate} className={"w-full"}>Create Event</Button>
                              <Button variant={"destructive"} className={"w-full"}>Cancel</Button>
                        </div>
                  </div>
            </Modal >
      )
}

export default CreateEvent