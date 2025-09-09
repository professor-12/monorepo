import { Button } from '@//components/ui/button';
import { Input } from '@//components/ui/input'
import Modal from '@//components/ui/Modal'
import { useAuth } from '@//hooks/auth';
import { BASE_URL } from '@//lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';

const ChannelModal = ({ handleChangeModal }) => {
      const queryClient = useQueryClient()
      const { user } = useAuth()
      const [form, setForm] = useState({})
      const createChannel = useMutation({
            mutationKey: ["create-channel"],
            mutationFn: async (e) => {
                  e.preventDefault()
                  const { name, visibility = "PUBLIC" } = form
                  if (!name || !visibility) throw new Error("All fields are required");
                  if (!user) return
                  const req = await fetch(`${BASE_URL}/channel/create`, {
                        method: "POST", headers: {
                              "Content-Type": "application/json",
                              "Authorization": "Bearer " + user?.uid

                        },
                        body: JSON.stringify({ name, visibility, slug: name + "-slug" })
                  })
                  const res = await req.json()
                  return res?.data
            },
            onSuccess: () => {
                  queryClient.refetchQueries(["channel"])
                  toast.success("Channel created successfully")
                  handleChangeModal(null)
            },
            onError: (err) => {
                  toast.error(JSON.stringify(err.message))
            }
      })
      return (
            <Modal>
                  <div className='bg-white px-6  p-3 pb-6 rounded-2xl w-full max-w-2xl'>
                        <div className='flex justify-end'>
                              <svg onClick={() => { handleChangeModal(null) }} xmlns="http://www.w3.org/2000/svg" width="24" className='absolute top-4 right-4 rounded-full border-' height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </div>
                        <div className='text-xl'>Create a Channel</div>
                        <form onSubmit={createChannel.mutate} action="" className='mt-3 space-y-6'>
                              <div>
                                    <Input onChange={(e) => {
                                          setForm(prev => {
                                                return { ...prev, [e.target.name]: e.target.value }
                                          })
                                    }} name="name" placeholder="Channel Name" />
                              </div>
                              <div className=''>
                                    <select onChange={(e) => {
                                          setForm(prev => {
                                                return { ...prev, [e.target.name]: e.target.value }
                                          })
                                    }} name="visibility" id="" className={className}>
                                          <option value="">Visibility</option>
                                          <option value="PRIVATE">Private</option>
                                          <option value="PUBLIC">Public</option>


                                    </select>
                              </div>
                              <Button disabled={!form.name} className={"w-full"}>Create Channel</Button>
                        </form>
                  </div>

            </Modal>
      )
}

export default ChannelModal




export const className = `file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-xl border bg-transparent px-3 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1.5px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`