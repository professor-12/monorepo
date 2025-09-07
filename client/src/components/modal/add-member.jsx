import React, { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { BASE_URL } from "@//lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useAuthContext } from "../AuthProvider";
import toast from "react-hot-toast";

const AddMember = ({ cancel, channelId }) => {
      const { user } = useAuthContext()
      const [profileResults, setProfileResults] = useState([]);
      const [query, setQuery] = useState({ stop: false, value: "" });
      const [selectedUser, setSelectedUser] = useState(null);
      const [role, setRole] = useState("MEMBER");
      const [loading, setLoading] = useState(false);

      // Debounced search
      useEffect(() => {
            if (query.stop) return;
            if (!query.value) {
                  return setProfileResults([]);
            }

            const handleSearch = async () => {
                  try {
                        const req = await fetch(`${BASE_URL}/user/ahead?q=${query.value}`);
                        const res = await req.json();
                        setProfileResults(res.data);
                  } catch (err) {
                        console.error("Search failed:", err);
                  }
            };

            const timeout = setTimeout(() => {
                  handleSearch();
            }, 500);

            return () => clearTimeout(timeout);
      }, [query]);

      const handleSubmit = async (e) => {
            e.preventDefault();
            if (!selectedUser) {
                  toast.error("Select a user");
            }

            console.log(channelId, selectedUser)
            try {
                  setLoading(true);
                  const req = await fetch(`${BASE_URL}/channel/add-member`, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                              "Authorization": "Bearer " + user?.uid
                        },
                        body: JSON.stringify({
                              channelId,
                              userId: selectedUser.id,
                              role,
                        }),
                  });

                  const res = await req.json();

                  if (!req.ok) {
                        throw new Error(res.message || "Failed to add member");
                  }

                  alert("Member added successfully");
                  cancel(null);
            } catch (err) {
                  console.error("Add member failed:", err);
                  cancel(null)
                  toast.error(err.message)
            } finally {
                  setLoading(false);
            }
      };

      return (
            <Modal>
                  <div className="w-full max-h-[80dvh] overflow-y-auto py-3 p-6 max-w-2xl rounded-xl bg-white">
                        <div>
                              <div className="flex pb-3 justify-end">
                                    <svg
                                          onClick={cancel}
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="1.9"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="lucide lucide-x cursor-pointer"
                                    >
                                          <path d="M18 6 6 18" />
                                          <path d="m6 6 12 12" />
                                    </svg>
                              </div>

                              <h1 className="text-lg font-semibold">Add a member</h1>

                              <form className="py-4 space-y-6" onSubmit={handleSubmit}>
                                    {/* Search Input */}
                                    <div>
                                          <Input
                                                value={query.value}
                                                onChange={(e) =>
                                                      setQuery(() => ({ value: e.target.value, stop: false }))
                                                }
                                                placeholder="Username or email of the student"
                                          />

                                          {profileResults.length > 0 && (
                                                <div className="max-h-[10rem] border rounded-xl border-border p-4 divide-y overflow-y-auto">
                                                      {profileResults.map((user) => {
                                                            const { profile } = user;
                                                            return (
                                                                  <div
                                                                        key={profile.id}
                                                                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                                                        onClick={() => {
                                                                              setSelectedUser(user);
                                                                              setQuery(() => ({
                                                                                    stop: true,
                                                                                    value: profile.displayName ?? user.email,
                                                                              }));
                                                                              setProfileResults([]);
                                                                        }}
                                                                  >
                                                                        <Avatar className="w-7 h-7">
                                                                              <AvatarImage src={profile?.picture} />
                                                                        </Avatar>
                                                                        <div className="flex flex-col">
                                                                              <span className="font-medium">
                                                                                    {profile?.displayName}
                                                                              </span>
                                                                              <span className="text-xs text-gray-500">
                                                                                    {profile?.email}
                                                                              </span>
                                                                        </div>
                                                                  </div>
                                                            );
                                                      })}
                                                </div>
                                          )}
                                    </div>

                                    {/* Role Input */}
                                    <Input
                                          placeholder="Role"
                                          value={role}
                                          onChange={(e) => setRole(e.target.value.toUpperCase())}
                                    />

                                    <Button className="w-full" type="submit" disabled={loading}>
                                          {loading ? "Adding..." : "Add user"}
                                    </Button>
                              </form>
                        </div>
                  </div>
            </Modal>
      );
};

export default AddMember;
