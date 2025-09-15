import React from 'react'
import Modal from '../ui/Modal'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useRef } from 'react'
import { useState } from 'react'
import { UserLock } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { BASE_URL } from '@//lib/utils'
import toast from 'react-hot-toast'
import { useAuthContext } from '../AuthProvider'

const AddPost = ({ handleChangeModal }) => {
      const _file = useRef(null)
      const [postContent, setPostContent] = useState("")
      const fileRef = useRef()
      const [file, setFile] = useState(null)
      const { user } = useAuthContext()
      const uploadFile = () => {
            fileRef.current?.click?.()
      }
      const createPost = useMutation({
            mutationFn: async () => {
                  if (!postContent) {
                        return;
                  }
                  const form = new FormData()
                  form.append("thumbnail", file)
                  form.append("content", postContent)
                  const eff = await fetch(BASE_URL + "/post/create", {
                        body: form, method: "POST", headers: {
                              "Authorization": "Bearer " + user?.uid
                        }
                  })
            },
            onSuccess: () => {
                  toast.success("Post created successfully");
                  handleChangeModal(null)
            },
            onError: (err) => {
                  toast.error(err)
            }
      })

      return (
            <Modal>
                  <div className='w-full space-y-8 p-4 px-6 max-h-[80vh]  overflow-auto cursor-default max-w-xl bg-white  rounded-3xl'>
                        <div className='space-y-3'>
                              <div className='flex justify-between cursor-pointer'>
                                    <h1 className='text-lg'>Add Post</h1>
                                    <CancelSvg onClick={() => { handleChangeModal(null) }} />
                              </div>
                              <Textarea onChange={e => setPostContent(e.target.value)} value={postContent} placeholder="Create a post" className={"border-none shadow-none focus-visible:ring-0 focus:ring-none"} />

                              {file &&
                                    <div className='relative border p-2 rounded-3xl'>
                                          <div className='flex justify-end p-1'>
                                                <CancelSvg onClick={(e) => {
                                                      setFile(null)
                                                }} className="cursor-pointer" />
                                          </div>

                                          <img className='w-full h-[10rem] object-contain object-center' src={URL.createObjectURL(file)} />
                                    </div>
                              }

                        </div>
                        <div className='flex px-2 border-t border-border justify-between pt-6'>
                              <div className='cursor-pointer'>
                                    <input accept='image/*' onChange={(e) => {
                                          setFile(e.target.files[0])
                                    }} ref={fileRef} className='hidden' type='file' />
                                    <ImageSvg onClick={uploadFile} />
                              </div>
                              <Button onClick={createPost.mutate} disabled={createPost.isPending} className={"cursor-pointer px-6 rounded-full"}>{createPost.isPending ? "Posting" : "Post"}</Button>
                        </div>
                  </div>
            </Modal>
      )
}

export default AddPost



export const ImageSvg = ({ ...props }) => {
      return (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-plus-icon lucide-image-plus"><path d="M16 5h6" /><path d="M19 2v6" /><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /><circle cx="9" cy="9" r="2" /></svg>)
}


export const CancelSvg = ({ ...props }) => {
      return (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>)
}