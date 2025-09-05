import { Input } from "@//components/ui/input";
import React, { useRef, useEffect, useState } from "react";
import { timeAgo } from "../channels/Thread";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@//lib/utils";
import { useAuth } from "@//hooks/auth";

const CommentSection = ({ postId }) => {
      const { user } = useAuth();
      const queryClient = useQueryClient();
      const [comment, setComment] = useState("");
      const ref = useRef();
      const posts = queryClient.getQueryData(["market"])?.data || [];
      useEffect(() => {
            ref?.current?.scrollIntoView({ behavior: "smooth" });
      }, [posts]);

      // get comments for this post from the posts list query
      const post = posts.find((p) => p.id === postId);
      const comments = post?.comments || [];

      const mutate = useMutation({
            mutationKey: ["comment"],
            mutationFn: async ({ postId, content }) => {
                  const res = await fetch(BASE_URL + "/comment/send", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + user?.uid,
                        },
                        body: JSON.stringify({ postId, content }),
                  });
                  if (!res.ok) throw new Error("Failed to send comment");
                  return res.json(); // server returns the new comment
            },
            onMutate: async ({ postId, content }) => {
                  await queryClient.cancelQueries(["market"]);

                  const previousPosts = queryClient.getQueryData(["market"])?.data;


                  queryClient.setQueryData(["market"], (data) => {
                        console.log(data)
                        const posts = data?.data
                        const newPost = posts.map((p) =>
                              p.id === postId
                                    ? {
                                          ...p,
                                          comments: [
                                                {
                                                      id: Date.now(),
                                                      content,
                                                      createdAt: new Date().toISOString(),
                                                      author: {
                                                            profile: {
                                                                  displayName: user?.name,
                                                                  picture: user?.profilePicture,
                                                            },
                                                      },
                                                },
                                                ...p.comments,
                                          ],
                                    }
                                    : p
                        )

                        console.log(newPost)
                        return { data: newPost, ...data }
                  });

                  setComment("");
                  return { data: previousPosts };
            },
            onError: (err, _, context) => {
                  queryClient.setQueryData(["market"], context.previousPosts);
            },
            onSettled: (_, __, { postId }) => {
                  queryClient.invalidateQueries(["market"]);
            },
      });

      if (!comments.length) {
            return <div>No comments yet.</div>;
      }

      return (
            <div className="cursor-default">
                  <div className="max-h-[60dvh] pb-5 space-y-3 overflow-y-auto">
                        {comments.map((comment, index) => {
                              const {
                                    author: { profile },
                                    content,
                                    createdAt,
                              } = comment;

                              return (
                                    <div key={index} className="border-b py-2">
                                          <div className="flex items-center gap-2">
                                                <img
                                                      src={profile?.picture || "/default-avatar.png"}
                                                      alt={profile?.displayName || "User"}
                                                      className="w-8 h-8 rounded-full"
                                                />
                                                <span className="font-medium">{profile?.displayName}</span>
                                                <span className="text-xs text-gray-500">
                                                      {timeAgo(createdAt)}
                                                </span>
                                          </div>
                                          <p className="ml-10 text-sm">{content}</p>
                                    </div>
                              );
                        })}
                        <div ref={ref}></div>
                  </div>

                  <form
                        onSubmit={(e) => {
                              e.preventDefault();
                              if (!comment.trim()) return;
                              mutate.mutate({ postId, content: comment });
                        }}
                        className="bg-white w-full"
                  >
                        <Input
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Comment"
                        />
                  </form>
            </div>
      );
};

export default CommentSection;
