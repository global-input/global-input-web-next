'use client'

import { useState, useCallback } from "react"
import { useGlobalInputApp } from 'global-input-react'
import type { InitData, ConnectOptions } from 'global-input-react'

import * as storage from "./storage"
import { WidgetState, MobileData } from "./commons"

export const useMobile = (
  initData: InitData | (() => InitData),
  showWidgetOnStart = false,
  configId: string | number = "default"
): MobileData => {
  const [isShowWidget, setShowWidget] = useState(showWidgetOnStart)
  const [settingsConfig, setSettingsConfigId] = useState(1)
  const [widgetState, setWidgetState] = useState(WidgetState.CONNECT_QR)
  
  const connectionSettings: storage.ConnectionSettings = storage.loadConnectionSettings()
  
  const connectOptions: ConnectOptions = {
    url: connectionSettings.url,
    apikey: connectionSettings.apikey,
    securityGroup: connectionSettings.securityGroup,
  }

  const mobile = useGlobalInputApp(
    {
      initData,
      options: connectOptions,
      codeAES: connectionSettings.codeKey,
    },
    isShowWidget,
    `${settingsConfig}-${configId}`
  )

  const { close } = mobile

  const onSaveSettings = useCallback(
    (settings: storage.ConnectionSettings) => {
      if (storage.saveConnectionSettings(settings)) {
        setWidgetState(WidgetState.PAIRING)
      } else {
        setWidgetState(WidgetState.CONNECT_QR)
      }
      setSettingsConfigId((configId) => configId + 1)
      close()
    },
    [close]
  )

  const loadSettings = useCallback(
    () => connectionSettings,
    [connectionSettings]
  )

  return {
    ...mobile,
    isShowWidget,
    onSaveSettings,
    loadSettings,
    widgetState,
    setWidgetState,
    setShowWidget,
  }
}