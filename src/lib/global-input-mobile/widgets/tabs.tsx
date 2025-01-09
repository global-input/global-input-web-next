'use client'

import { WidgetState } from '../commons'
import { TabBase, TabText, ConnectIcon, SettingsIcon, PairingIcon } from './base-components'

interface TabProps {
  widgetState: WidgetState
  setWidgetState: (widgetState: WidgetState) => void
}

const ConnectTab = ({ widgetState, setWidgetState }: TabProps) => {
  if (widgetState === WidgetState.CONNECT_QR) {
    return (
      <TabBase active>
        <ConnectIcon />
        <TabText>Connect</TabText>
      </TabBase>
    )
  }
  return (
    <TabBase onClick={() => setWidgetState(WidgetState.CONNECT_QR)}>
      <ConnectIcon />
      <TabText>Connect</TabText>
    </TabBase>
  )
}

const SettingsTab = ({ widgetState, setWidgetState }: TabProps) => {
  if (widgetState === WidgetState.SETTINGS) {
    return (
      <TabBase active>
        <SettingsIcon />
        <TabText>Settings</TabText>
      </TabBase>
    )
  }
  return (
    <TabBase onClick={() => setWidgetState(WidgetState.SETTINGS)}>
      <SettingsIcon />
      <TabText>Settings</TabText>
    </TabBase>
  )
}

const PairingTab = ({ widgetState, setWidgetState }: TabProps) => {
  if (widgetState === WidgetState.PAIRING) {
    return (
      <TabBase active>
        <PairingIcon />
        <TabText>Pair</TabText>
      </TabBase>
    )
  }
  return (
    <TabBase onClick={() => setWidgetState(WidgetState.PAIRING)}>
      <PairingIcon />
      <TabText>Pair</TabText>
    </TabBase>
  )
}

export const Tabs = (props: TabProps) => (
  <div className="flex flex-row justify-center items-center h-full w-full mb-3">
    <ConnectTab {...props} />
    <SettingsTab {...props} />
    <PairingTab {...props} />
  </div>
)