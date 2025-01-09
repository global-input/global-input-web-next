'use client'

import { useState, useEffect } from 'react'
import { ConnectQR, PairingQR } from 'global-input-react'

import * as globalInputConfig from "@/lib/global-input-config"
import { WidgetState } from '../commons'
import { SettingsEditor } from '../settingsEditor'
import { Button, ErrorMessage, ConnectIcon, DisconnectIcon } from './base-components'
import { Tabs } from './tabs'
import { AppScanInstruction, AppQROverlay } from './qr-components'
import type { ConnectWidgetProps, ButtonProps, WhenProps } from './types'

function buildAppLaunchedMessage(mobile: any) {
  let globalInputUrl = globalInputConfig.getGlobalInputAppLaunchBaseURL()
  const session = mobile.registeredInfo?.session
  const code = Date.now().toString(36)
  let url = mobile.registeredInfo?.url
  
  if (!session || !url) {
    return {
      url: null,
      code,
      session,
      globalInputUrl
    }
  }
  
  globalInputUrl += "&session=" + session
  globalInputUrl += "&code=" + code
  globalInputUrl += "&url=" + encodeURIComponent(url)
  
  return {
    url,
    code,
    session,
    globalInputUrl
  }
}

const onQRCodeClicked = (code: string) => {
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(code)
  } else {
    const el = document.createElement('textarea')
    el.value = code
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
}

export const ConnectWidget = ({ mobile }: ConnectWidgetProps) => {
  const {
    widgetState,
    setWidgetState,
    errorMessage,
    onSaveSettings,
    loadSettings,
    restart,
    isConnected,
    isShowWidget,
    isConnectionDenied,
    isError,
  } = mobile
  
  const [showGlobalInputQRCode, setShowGlobalInputQRCode] = useState(true)

  if (isConnected || !isShowWidget) {
    return null
  }

  let message = isConnectionDenied && (
    <ErrorMessage>
      You can only use one mobile app per session.{' '}
      <span
        className="text-[#0984e3] cursor-pointer underline"
        onClick={() => restart()}
      >
        Click here
      </span>{' '}
      to start a new session.
    </ErrorMessage>
  )

  if (isError) {
    message = <ErrorMessage>{errorMessage}</ErrorMessage>
  }

  const handleGlobalInputAppClick = () => {
    setShowGlobalInputQRCode(true)
  }

  const handleOverlayClick = () => {
    setShowGlobalInputQRCode(false)
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const appLaunchedData = buildAppLaunchedMessage(mobile)

  if (appLaunchedData.session) {
    const onClientAppLaunched = (data: any) => {
      if (data.code === appLaunchedData.code) {
        setShowGlobalInputQRCode(false)
      }
    }
    mobile.setClientAppLaunched(onClientAppLaunched)
  }

  return (
    <div className="flex flex-col justify-start items-start p-5 bg-white rounded-t-xl min-[800px]:rounded-xl">
      <div className="flex flex-row items-start justify-between w-full items-end">
        <Tabs widgetState={widgetState} setWidgetState={setWidgetState} />
      </div>
      <div className="flex flex-col justify-start items-center m-0 p-0 w-full overflow-scroll relative">
        {widgetState === WidgetState.CONNECT_QR && (
          <ConnectQR
            mobile={mobile}
            hspace={100}
            label={
              !showGlobalInputQRCode && (
                <AppScanInstruction
                  onGlobalInputAppClick={handleGlobalInputAppClick}
                  variant="button"
                />
              )
            }
            onClickCode={onQRCodeClicked}
          />
        )}

        {widgetState === WidgetState.PAIRING && (
          <PairingQR
            mobile={mobile}
            hspace={100}
            label={
              !showGlobalInputQRCode && (
                <AppScanInstruction
                  onGlobalInputAppClick={handleGlobalInputAppClick}
                  variant="link"
                />
              )
            }
          />
        )}

        {widgetState === WidgetState.SETTINGS && (
          <SettingsEditor
            saveSettings={onSaveSettings}
            loadSettings={loadSettings}
          />
        )}

        {message}

        <AppQROverlay
          showOverlay={showGlobalInputQRCode}
          onOverlayClick={handleOverlayClick}
          onContainerClick={stopPropagation}
          onClickCapture={() => {
            onQRCodeClicked(appLaunchedData.globalInputUrl)
          }}
          qrValue={appLaunchedData.globalInputUrl}
        />
      </div>
    </div>
  )
}

export const ConnectWindow = ({ mobile }: ConnectWidgetProps) => {
  const { isConnected, isShowWidget } = mobile

  useEffect(() => {
    let scrollDisabled = false
    if (isShowWidget && !isConnected) {
      document.body.style.overflow = "hidden"
      scrollDisabled = true
    }
    return () => {
      if (scrollDisabled) {
        scrollDisabled = false
        document.body.style.overflow = "unset"
      }
    }
  }, [isConnected, isShowWidget])

  if (!isShowWidget || isConnected) {
    return null
  }

  return (
    <div
      className="bg-[#0009] flex m-0 p-0 fixed z-10 w-screen h-screen flex-col items-center justify-end min-[800px]:justify-center top-0 left-0 animate-[fadeIn_500ms_cubic-bezier(0.230,1.000,0.320,1.000)]"
      onClick={(e) => mobile.setShowWidget(e.target !== e.currentTarget)}
    >
      <div className="flex flex-col justify-center relative">
        <ConnectWidget mobile={mobile} />
      </div>
    </div>
  )
}

export const ConnectButton = ({
  mobile,
  label = "Connect",
  skin,
}: ButtonProps) => {
  const { setShowWidget, isConnected, isShowWidget } = mobile

  if (isConnected || isShowWidget) {
    return null
  }

  if (skin === "white") {
    return (
      <Button onClick={() => setShowWidget(true)}>
        {label}
      </Button>
    )
  }

  return (
    <Button onClick={() => setShowWidget(true)} skin="dark">
      <ConnectIcon />
      <div className="pl-1.5 text-[15px]">{label}</div>
    </Button>
  )
}

export const DisconnectButton = ({
  mobile,
  label = "Disconnect",
  skin,
}: ButtonProps) => {
  const { isConnected, isConnectionDenied, isDisconnected, restart } = mobile

  if (isConnected || isConnectionDenied || isDisconnected) {
    if (skin === "white") {
      return <Button onClick={() => restart()}>{label}</Button>
    }
    return (
      <Button onClick={() => restart()} skin="dark">
        <DisconnectIcon />
        <div className="pl-1.5 text-[15px]">{label}</div>
      </Button>
    )
  }
  return null
}

export const WhenConnected = ({ mobile, children }: WhenProps) => {
  if (mobile.isConnected) {
    return <>{children}</>
  }
  return null
}

export * from './types'