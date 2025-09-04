import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { BASE_URL } from '../lib/utils'
import { useState } from 'react'
const MarketPlaceContext = createContext()
const MarketPlaceProvider = ({ children }) => {
      const [tab, setTab] = useState("Home")
      const handleChangeTab = (id) => {
            setTab(() => id)
      }
      const data = useQuery({ queryKey: ["market"], queryFn: async () => { return (await fetch(BASE_URL + "/posts").then(e => e.json())) } })

      return (
            <MarketPlaceContext.Provider value={{ data: { ...data.data }, tab, handleChangeTab }}>{children}</MarketPlaceContext.Provider>
      )
}

export default MarketPlaceProvider

export function useMarketPlace() {
      const context = useContext(MarketPlaceContext)

      if (!context) throw new Error("No context found")

      return context
}