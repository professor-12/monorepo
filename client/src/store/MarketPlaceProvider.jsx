import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { BASE_URL } from '../lib/utils'
import { useState } from 'react'
const MarketPlaceContext = createContext()
const MarketPlaceProvider = ({ children }) => {
      const [tab, setTab] = useState("Home")
      const [openComment, setOpenComment] = useState(null)
      const handleChangeTab = (id) => {
            setTab(() => id)
      }
      const handleOpenComment = (id) => {
            setOpenComment(() => id)
      }
      const data = useQuery({ queryKey: ["market"], queryFn: async () => { return (await fetch(BASE_URL + "/posts").then(e => e.json()))?.data } })

      return (
            <MarketPlaceContext.Provider value={{ data, tab, handleChangeTab, openComment, handleOpenComment }}>{children}</MarketPlaceContext.Provider>
      )
}

export default MarketPlaceProvider


export function useMarketPlace() {
      const context = useContext(MarketPlaceContext)

      if (!context) throw new Error("No context found")

      return context
}