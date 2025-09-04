import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import useFetch from "../hooks/use-fetch";
import { BASE_URL } from "../lib/utils";
const Channel = createContext({});

const ChannelProvider = ({ children }) => {
    const data = useQuery({ queryFn: async () => await fetch(BASE_URL + "/pubic-channels").then(e => e.json()), queryKey: ["channel"] })
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