import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { BASE_URL } from "../lib/utils";
import { useAuth } from "../hooks/auth";
import { useAuthContext } from "../components/AuthProvider";
const Channel = createContext({});

const ChannelProvider = ({ children }) => {
    const { user } = useAuthContext()
    const data = useQuery({ queryFn: async () => await fetch(BASE_URL + "/pubic-channels", { headers: { "Authorization": "Bearer " + user?.uid } }).then(e => e.json()), queryKey: ["channel"] })
    const [activeChannelId, setActiveChannel] = useState(null)


    useEffect(() => {
        if (!data.data) return
        setActiveChannel(data.data[0]?.id)
    }, [data.isFetched])
    const handleChangeChannel = (id) => {
        setActiveChannel(id)
    }

    return <Channel.Provider value={{ handleChangeChannel, activeChannelId, channelData: data }}>{children}</Channel.Provider>;
};

export default ChannelProvider;


export const useChannel = () => {
    const context = useContext(Channel)
    if (!context) {
        throw new Error("Context not found")
    }
    return context
}