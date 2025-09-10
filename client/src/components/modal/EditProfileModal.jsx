import React, { useState, useRef } from 'react'
import Modal from '../ui/Modal'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BASE_URL } from '@//lib/utils'
import { useAuthContext } from '../AuthProvider'
import { CancelSvg } from './add-post'
import toast from 'react-hot-toast'

const EditProfileModal = ({ data, handleCloseModal }) => {
      const { user } = useAuthContext()
      const queryClient = useQueryClient()
      const fileRef = useRef(null)

      const [form, setForm] = useState({
            displayName: data?.displayName || "",
            username: data?.user?.username || "",
            bio: data?.bio || "",
            picture: null, // actual file
      })

      const [preview, setPreview] = useState(data?.picture)

      const handleChange = (e) => {
            const { name, value, files, type } = e.target
            if (type === "file" && files?.[0]) {
                  setForm((f) => ({ ...f, picture: files[0] }))
                  setPreview(URL.createObjectURL(files[0]))
            } else {
                  setForm((f) => ({ ...f, [name]: value }))
            }
      }

      const { mutate, isPending } = useMutation({
            mutationKey: ["edit-profile"],
            mutationFn: async () => {
                  const formData = new FormData()
                  formData.append("bio", form.bio)
                  formData.append("displayName", form.displayName)
                  formData.append("username", form.username)
                  if (form.picture) formData.append("picture", form.picture)

                  await fetch(`${BASE_URL}/profile/edit`, {
                        method: "PUT", // or PUT depending on backend
                        body: formData,
                        headers: {
                              Authorization: "Bearer " + user?.uid,
                        },
                  })
            },
            onSuccess: () => {
                  queryClient.refetchQueries(["profile"])
                  toast.success("Profile updated successfully!!")
                  handleCloseModal(false)
            }
      })

      return (
            <Modal>
                  <div className="w-[80%] max-w-2xl cursor-default bg-white py-4 rounded-2xl space-y-5 px-6">
                        <div className='flex items-center justify-between'>
                              <h1 className="text-lg">Edit Profile</h1>
                              <CancelSvg className="cursor-pointer" onClick={() => { handleCloseModal(null) }} />
                        </div>
                        <div
                              onClick={() => fileRef.current?.click()}
                              className="size-[8rem] cursor-pointer overflow-hidden relative rounded-full bg-gray-200"
                        >
                              <img
                                    className="w-full h-full object-cover"
                                    src={preview}
                                    alt="Profile preview"
                              />
                        </div>

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                              <input
                                    name="picture"
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleChange}
                              />

                              <div className="space-y-2">
                                    <label>Display name</label>
                                    <Input
                                          name="displayName"
                                          value={form.displayName}
                                          onChange={handleChange}
                                    />
                              </div>

                              <div className="space-y-2">
                                    <label>Username</label>
                                    <Input
                                          name="username"
                                          value={form.username}
                                          onChange={handleChange}
                                    />
                              </div>

                              <div className="space-y-2">
                                    <label>Bio</label>
                                    <Textarea
                                          name="bio"
                                          value={form.bio}
                                          onChange={handleChange}
                                    />
                              </div>

                              <div className="pt-6 flex gap-4">
                                    <Button
                                          type="button"
                                          onClick={mutate}
                                          disabled={isPending}
                                          className="flex-1 !rounded-2xl p-6"
                                    >
                                          {isPending ? "Saving..." : "Edit"}
                                    </Button>
                              </div>
                        </form>
                  </div>
            </Modal>
      )
}

export default EditProfileModal
