'use client'

import React, { useState } from "react"
import { twMerge } from 'tailwind-merge'
import type { ConnectionSettings } from "./storage"
import { Help } from "./help"

const Button = ({ onClick, children }: {
  onClick: () => void
  children: React.ReactNode
}) => (
  <button
    onClick={onClick}
    className={`
      text-decoration-none text-xs rounded-lg text-[#4281bd] bg-white whitespace-nowrap
      p-2.5 flex flex-row justify-center items-center border-[#eeeeee]
      min-w-[50px] max-w-[200px] mx-1.5
      shadow-[0px_8px_15px_rgba(0,0,0,0.1)]
      transition-all duration-300 ease-in-out cursor-pointer
      font-['Roboto',sans-serif]
      hover:transform hover:-translate-y-[3px] hover:shadow-[0_0_50px_#ffff]
    `}
  >
    {children}
  </button>
)

const Input = ({ 
  id, 
  placeholder, 
  value, 
  onChange, 
  onFocus 
}: {
  id: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
}) => (
  <input
    id={id}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    onFocus={onFocus}
    className={`
      block leading-8 m-0 pl-2.5 w-full text-base
      border-2 border-solid border-[rgb(230,230,230)]
      bg-[rgb(249,249,249)] rounded
      box-border font-medium
      focus:border focus:border-solid focus:border-[#2c7ac9]
      placeholder-shown:+ .control-label:invisible
      placeholder-shown:+ .control-label:z-[-1]
      placeholder-shown:+ .control-label:transition-[0.2s_ease-in-out]
      not-placeholder-shown:+ .control-label:visible
      not-placeholder-shown:+ .control-label:z-[1]
      not-placeholder-shown:+ .control-label:opacity-100
      not-placeholder-shown:+ .control-label:transform
      not-placeholder-shown:+ .control-label:translate-x-2.5
      not-placeholder-shown:+ .control-label:-translate-y-[47px]
      not-placeholder-shown:+ .control-label:transition-[0.2s_ease-in-out_transform]
      not-placeholder-shown:+ .control-label:bg-white
    `}
  />
)

const Label = ({ htmlFor, children }: {
  htmlFor: string
  children: React.ReactNode
}) => (
  <label
    htmlFor={htmlFor}
    className={twMerge(
      "control-label",
      "inline-block opacity-0",
      "text-[rgb(53,116,230)]",
      "transition-[0.2s_ease-in-out_transform]",
      "text-xs w-auto px-1.5"
    )}
  >
    {children}
  </label>
)

const WebSocketServer = () => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://github.com/global-input/global-input-node"
    className="text-[rgb(53,116,230)] no-underline ml-1.5"
  />
)

type SetSettingsParams = ConnectionSettings | ((settings: ConnectionSettings) => ConnectionSettings)

interface SettingsFieldProp {
  settings: ConnectionSettings
  setSettings: (settings: SetSettingsParams) => void
  expand: string
  setExpand: (expand: string) => void
}

const ProxyField = ({
  settings,
  setSettings,
  expand,
  setExpand,
}: SettingsFieldProp) => (
  <div className="relative w-full pt-[15px]">
    <Input
      id="url"
      onChange={(evt) => {
        const url = evt.target.value
        setSettings((setting) => ({ ...setting, url }))
      }}
      value={settings.url ?? ""}
      placeholder="Websocket Server URL"
      onFocus={() => setExpand("url")}
    />
    <Label htmlFor="url">WebSocket Server URL</Label>
    <Help expandId="url" expand={expand} setExpand={setExpand}>
      The WebSocket Server URL determines the WebSocket server that routes messages between your mobile app and this application...
    </Help>
  </div>
)

const APIKeyField = ({
  settings,
  setSettings,
  expand,
  setExpand,
}: SettingsFieldProp) => (
  <div className="relative w-full pt-[15px]">
    <Input
      id="apiKey"
      onChange={(evt) => {
        const apikey = evt.target.value
        setSettings((setting) => ({ ...setting, apikey }))
      }}
      value={settings.apikey ?? ""}
      placeholder="API Key"
      onFocus={() => setExpand("apikey")}
    />
    <Label htmlFor="apiKey">API Key</Label>
    <Help expandId="apikey" expand={expand} setExpand={setExpand}>
      The API Key is used by the WebSocket server (specified above) to identify incoming connections. While there are no security implications in exposing this value, it may affect the WebSocket server's performance due to an increased workload. The WebSocket server does not store any sensitive information and only proxies encrypted messages between your mobile app and this application. If left blank, the default API Key set by our WebSocket server will be used.
    </Help>
  </div>
)

const SecurityGroupField = ({
  settings,
  setSettings,
  expand,
  setExpand,
}: SettingsFieldProp) => (
  <div className="relative w-full pt-[15px]">
    <Input
      id="securityGroup"
      onChange={(evt) => {
        const securityGroup = evt.target.value
        setSettings((setting) => ({ ...setting, securityGroup }))
      }}
      value={settings.securityGroup ?? ""}
      placeholder="Security Group Key"
      onFocus={() => setExpand("securityGroup")}
    />
    <Label htmlFor="securityGroup">Security Group Key</Label>
    <Help expandId="securityGroup" expand={expand} setExpand={setExpand}>
      The Security Group Key functions similarly to an API key, allowing this client application to authenticate incoming connections from your mobile app. If you change this key, remember to re-pair your mobile app in the "Pair" tab to maintain connectivity. Leaving this field blank will use the default key provided with the Global Input App installation.
    </Help>
  </div>
)

const CodeKeyField = ({
  settings,
  setSettings,
  expand,
  setExpand,
}: SettingsFieldProp) => (
  <div className="relative w-full pt-[15px]">
    <Input
      id="codeKey"
      onChange={(evt) => {
        const codeKey = evt.target.value
        setSettings((setting) => ({ ...setting, codeKey }))
      }}
      value={settings.codeKey ?? ""}
      placeholder="Code Key"
      onFocus={() => setExpand("codeKey")}
    />
    <Label htmlFor="codeKey">Code Key</Label>
    <Help expandId="codeKey" expand={expand} setExpand={setExpand}>
      The Code Key encrypts the QR Code content displayed by this application. If you change this key, you'll need to re-pair your mobile app in the "Pair" tab. Leaving this field blank will use the default value provided with the Global Input App installation.
    </Help>
  </div>
)

interface Props {
  loadSettings: () => ConnectionSettings
  saveSettings: (settings: ConnectionSettings) => void
}

export const SettingsEditor = ({
  loadSettings,
  saveSettings,
}: Props) => {
  const [settings, setSettings] = useState(loadSettings)
  const [expand, setExpand] = useState("")
  
  const onSave = () => saveSettings(settings)

  return (
    
    <div className="flex flex-col justify-start items-start p-2.5 w-[80vw] max-w-[390px] bg-white text-black overflow-scroll h-[65vh] min-h-[300px] min-[400px]:h-[320px] min-[450px]:h-[350px] min-[600px]:h-[425px]">
      <SecurityGroupField
        settings={settings}
        setSettings={setSettings}
        expand={expand}
        setExpand={setExpand}
      />
      <CodeKeyField
        settings={settings}
        setSettings={setSettings}
        expand={expand}
        setExpand={setExpand}
      />
      <ProxyField
        settings={settings}
        setSettings={setSettings}
        expand={expand}
        setExpand={setExpand}
      />
      <APIKeyField
        settings={settings}
        setSettings={setSettings}
        expand={expand}
        setExpand={setExpand}
      />
      <div className="flex m-0 flex-row justify-between w-full items-center pb-[50px]">
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  )
}