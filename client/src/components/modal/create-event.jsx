import React from 'react'
import Modal from '../ui/Modal'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Calendar24 } from '../ui/date-picker'
import { Button } from '../ui/button'

const CreateEvent = () => {
      return (
            <Modal>
                  <div className='bg-white w-full max-w-2xl p-2 rounded-lg flex cursor-default'>
                        <div>
                              <div className='size-[12rem] rounded-2xl bg-slate-300/20'></div>
                        </div>
                        <div className='flex-1  px-6 space-y-5 p-4'>
                              <div>
                                    <Input placeholder="Event name" className={"!border-none focus:border-0 !focus-visible:border-0 !focus-visible:outline-0 !focus:outline-none w-full !text-3xl"} />
                              </div>
                              <div className='flex border-b pb-4  justify-between'>
                                    <p className='text-lg'>Start</p> <Calendar24 />
                              </div>
                              <div className='flex justify-between'>
                                    <p className='text-lg'>End</p> <Calendar24 />
                              </div>
                              <Input placeholder="Description" />
                              <Input className={""} type={"number"} placeholder="Capacity" />
                              <Input className={""} type={"number"} placeholder="Location" />
                              <Button className={"w-full"}>Create Event</Button>
                        </div>
                  </div>
            </Modal>
      )
}

export default CreateEvent