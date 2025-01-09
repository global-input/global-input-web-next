'use client'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

export const Button = ({ 
  onClick, 
  children, 
  className = '', 
  skin = '' 
}: {
  onClick: () => void
  children: React.ReactNode
  className?: string
  skin?: string
}) => (
  <button
    onClick={onClick}
    className={twMerge(
      "text-[15px] rounded-lg text-[#4281bd] bg-white whitespace-nowrap",
      "py-[15px] px-[15px] flex flex-row justify-center items-center border-none",
      "min-w-[50px] max-w-[300px] mx-[5px]",
      "transition-all duration-300 ease-in-out cursor-pointer font-bold",
      "hover:bg-[#e3e3e3]",
      skin === 'dark' && "bg-[rgb(208,226,247)] hover:bg-[rgb(188,206,217)]",
      className
    )}
  >
    {children}
  </button>
)

export const TabBase = ({ 
  active, 
  onClick, 
  children 
}: {
  active?: boolean
  onClick?: () => void
  children: React.ReactNode
}) => (
  <button
    onClick={onClick}
    className={twMerge(
      "rounded-[30px] border-0 mx-[7px] p-[15px]",
      "flex flex-col justify-center w-[110px] h-[60px] items-center cursor-pointer",
      "hover:bg-[#efefef]",
      active ? "bg-[#eeeeee]" : "bg-[#dedede]"
    )}
  >
    {children}
  </button>
)

export const TabText = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[#4872d3] text-xs font-semibold">{children}</div>
)

export const ConnectIcon = () => (
  <Image
    src="/images/connect.png"
    alt="Connect"
    width={22}
    height={22}
    className="block w-[22px] h-auto"
  />
)

export const DisconnectIcon = () => (
  <Image
    src="/images/disconnect.png"
    alt="Disconnect"
    width={22}
    height={22}
    className="block w-[22px] h-auto"
  />
)

export const SettingsIcon = () => (
  <Image
    src="/images/settings.png"
    alt="Settings"
    width={22}
    height={22}
    className="hidden min-[530px]:block"
  />
)

export const PairingIcon = () => (
  <Image
    src="/images/pairing.png"
    alt="Pair"
    width={22}
    height={22}
    className="hidden min-[530px]:block"
  />
)

export const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="text-white text-xs p-[6px] m-[10px] rounded-xl bg-[#ff8786] max-w-[350px] max-h-[100px] overflow-scroll">
    {children}
  </div>
)

export const CloseIcon = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`
      absolute cursor-pointer text-white border-none rounded-full bg-[#ff6b6b]
      text-[40px] leading-none font-bold inline-block text-center
      w-[45px] h-[45px] -top-[60px] right-[15px]
      before:content-['×']
    `}
  />
)

export const BlueLink = ({ onClick, children }: { 
  onClick: () => void 
  children: React.ReactNode 
}) => (
  <span 
    onClick={onClick}
    className="text-[#0984e3] cursor-pointer underline"
  >
    {children}
  </span>
)