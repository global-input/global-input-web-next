'use client';

import { useConnectToMobile, ConnectWindow, ConnectButton } from "../mobile-ui";

export default function MobileConnect() {
  const mobile = useConnectToMobile();
  
  return (
    <>
      <ConnectButton mobile={mobile} label="Connect Mobile" />
      <ConnectWindow mobile={mobile} />
    </>
  );
}