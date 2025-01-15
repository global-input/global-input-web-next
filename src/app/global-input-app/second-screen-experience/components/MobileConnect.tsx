'use client';

import { useConnectToMobile, ConnectWindow, ConnectButton } from "../mobile-ui";

export default function MobileConnect() {
  const mobile = useConnectToMobile();
  
  return (
    <>
      <ConnectButton mobile={mobile} label="See it in action" />
      <ConnectWindow mobile={mobile} />
    </>
  );
}