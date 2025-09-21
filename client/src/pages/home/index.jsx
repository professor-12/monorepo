import Event from '@//components/(tabs)/components/event/page'
import MarketPlace from '@//components/(tabs)/components/marketplace/MarketPlace'
import MarketPlaceProvider from '@//store/MarketPlaceProvider'
import { useTab } from '@//store/TabProvider'
import { Channel } from '@/components/(tabs)/components/channels/Channels'
import AI from '@/components/modal/ai/page'
import ChannelProvider from '@/store/ChannelProvider'
import React from 'react'

const HomePage = () => {
      const { tab } = useTab()
      const slot = () => {
            switch (tab) {
                  case "for-you":
                        return <MarketPlaceProvider>
                              <MarketPlace></MarketPlace>
                        </MarketPlaceProvider>
                  case "channel":
                        return <ChannelProvider>
                              <Channel />
                        </ChannelProvider>
                  case "event":
                        return <Event />
                  default:
                        return (<MarketPlaceProvider>
                              <MarketPlace></MarketPlace>
                        </MarketPlaceProvider>)


            }
      }
      return slot()
}

export default HomePage