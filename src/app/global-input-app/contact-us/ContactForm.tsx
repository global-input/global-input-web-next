'use client';

import { useConnectToMobile, ConnectWindow, ConnectButton } from "./mobile-ui"

export function ContactForm() {
  const mobile = useConnectToMobile()

  return (
    <>
      <ConnectButton mobile={mobile} label="Connect Mobile" />
      <ConnectWindow mobile={mobile} />
    </>
  )
}