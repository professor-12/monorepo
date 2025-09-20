import { CancelSvg } from '@//components/modal/add-post'
import { Button } from '@//components/ui/button'
import Modal from '@//components/ui/Modal'
import { useAuth } from '@//hooks/auth'
import { BASE_URL } from '@//lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const DeleteModal = ({ cancel, id }) => {
      const queryClient = useQueryClient()
      const { user } = useAuth()
      const deletePost = useMutation({
            mutationFn: async (id) => {
                  const res = await fetch(BASE_URL + `/post/${id}`, {
                        method: "DELETE",
                        headers: { Authorization: "Bearer " + user?.uid },
                  });
                  if (!res.ok) throw new Error("Failed to delete");
                  // return res.json();
            },
            onSuccess: () => {
                  queryClient.invalidateQueries(["my-post"]);
                  cancel()
                  toast.success("Post deleted successfully")
            },
            onError: () => {
                  toast.error("Failed to delete post")
            }
      });
      return (
            <Modal>
                  <div className='max-w-md bg-white space-y-5 w-full p-3 px-5 rounded-2xl'>
                        <div className='flex justify-between w-full'>
                              <h1 className='text-xl'>Are you sure you want to delete this post?</h1>
                              <CancelSvg onClick={cancel} />
                        </div>
                        <div className='flex justify-end items-center'>
                              <Button onClick={() => deletePost.mutate(id)} variant="destructive" className={"w-full cursor-pointer"}>{deletePost.isPending ? "Please wait" : "Delete"}</Button>
                        </div>
                  </div>
            </Modal>
      )
}

export default DeleteModal