import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const TabContext = createContext({})

const TabProvider = ({ children }) => {
      const [tab, setTab] = useState("for-you")
      const changeTab = (index) => {
            setTab((prev) => { return index })
      }
      return (
            <TabContext.Provider value={{ tab, changeTab }}>{children}</TabContext.Provider>
      )
}

export default TabProvider


export function useTab() {
      const context = useContext(TabContext)
      if (!context) {
            throw new Error("TabContext not found")
      }
      return context

}