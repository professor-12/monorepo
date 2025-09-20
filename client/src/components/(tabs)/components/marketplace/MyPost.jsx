import { useAuthContext } from "@//components/AuthProvider";
import { Button } from "@//components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@//components/ui/card";
import { BASE_URL } from "@//lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import React from "react";
import DeleteModal from "./delete-modal";
import { useState } from "react";

const MyPost = () => {
      const { user } = useAuthContext();

      const myPost = useQuery({
            queryKey: ["my-post"],
            queryFn: async () => {
                  const res = await fetch(BASE_URL + "/post/my-post", {
                        headers: {
                              Authorization: "Bearer " + user?.uid, // ensure this is a JWT or valid identifier
                        },
                  });

                  if (!res.ok) {
                        throw new Error("Failed to fetch posts");
                  }

                  const data = await res.json();
                  return data?.data || [];
            },
            initialData: [],
            enabled: !!user,
      });

      return (
            <div className="p-4 py-6">
                  <h1 className="text-xl mb-4">My Post</h1>

                  {myPost.isLoading && <p>Loading...</p>}
                  {myPost.isError && <p>Error loading posts</p>}

                  <div className="text-sm grid gap-3  grid-cols-3 p-2 rounded">
                        {
                              myPost.data.map((data) => {
                                    return (
                                          <PostCard key={data.id} post={data} />
                                    )
                              })
                        }
                  </div>
            </div>
      );
};



const PostCard = ({ post, onEdit = () => { }, ...props }) => {
      const queryClient = useQueryClient()
      const [confirmDelete, setConfirmDelete] = useState(null)
      const savePost = useMutation({
            mutationFn: async ({ formData, id }) => {
                  const url = id ? `${BASE_URL}/post/${id}` : `${BASE_URL}/post`;
                  const method = id ? "PUT" : "POST";

                  const res = await fetch(url, {
                        method,
                        headers: { Authorization: "Bearer " + user?.uid },
                        body: formData,
                  });
                  if (!res.ok) throw new Error("Failed to save post");
                  return res.json();
            },
            onSuccess: () => {
                  queryClient.invalidateQueries(["my-post"]);
                  setEditingPost(null);
            },
      });

      return (
            <Card className="w-full p-0 min-h-[20rem] rounded-2xl shadow-sm">
                  {confirmDelete && <DeleteModal id={post.id} cancel={() => {
                        setConfirmDelete(null)
                  }} />}
                  <CardContent className="space-y-4">
                        {post.thumbnail && (
                              <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="rounded-lg h-52 w-full object-cover"
                              />
                        )}
                        <p className="text-gray-600 line-clamp-4  text-sm">{post.content}</p>

                        {/* tags */}
                        {post.tags?.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                    {post.tags.map((tag, i) => (
                                          <span
                                                key={i}
                                                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                                          >
                                                #{tag}
                                          </span>
                                    ))}
                              </div>
                        )}
                        <div className="flex w-full gap-2 py-2">
                              <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onEdit(post)}
                                    className="rounded-full"
                              >
                                    <Pencil className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => setConfirmDelete(post.id)}
                                    className="rounded-full"
                              >
                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                        </div>
                  </CardContent>
            </Card>
      );
};

export default MyPost;
