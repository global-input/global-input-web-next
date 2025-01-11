'use client'

import React from 'react'
import {
  useConnectToMobile,
  ConnectWindow,
  ConnectButton,
  DisconnectButton,
} from "./mobile-ui"

export function HomePageClient() {
  const mobile = useConnectToMobile()

  return (
    <div className="flex flex-row mt-[30px]
                    min-[300px]:w-[260px]
                    min-[500px]:w-[340px]
                    min-[650px]:w-[370px]">
      <ConnectButton label="Connect Mobile" mobile={mobile} />
      <ConnectWindow mobile={mobile} />
      <DisconnectButton mobile={mobile} />
    </div>
  )
}