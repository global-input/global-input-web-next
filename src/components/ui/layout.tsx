'use client'

import { twMerge } from 'tailwind-merge'
import type { MobileData } from '@/lib/global-input-mobile'
import { WhenConnected } from '@/lib/global-input-mobile'

export function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full bg-[rgb(219,240,240)]">
      {children}
    </div>
  )
}

export function AppTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      flex flex-row justify-center text-center text-xs text-[#445566] font-georgia
      min-[150px]:text-2xl
      min-[400px]:text-3xl min-[400px]:mb-2.5
      print:hidden
    ">
      {children}
    </div>
  )
}

export function AppBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col justify-center items-center p-2.5 flex-1">
      {children}
    </div>
  )
}

export function AppContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[95%] flex flex-col justify-center items-center p-2.5 flex-1">
      {children}
    </div>
  )
}

export function AppTitleSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      block pt-0
      min-[340px]:pt-2.5
      min-[500px]:pt-10
    ">
      {children}
    </div>
  )
}

export function Title({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge(`
      text-xs text-[#445566] self-start font-georgia
      min-[150px]:text-base
      min-[400px]:text-xl min-[400px]:mb-2.5
      print:hidden
    `, className)}>
      {children}
    </div>
  )
}

export function FormTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      text-[10px] text-[#445566] self-start font-georgia
      min-[150px]:text-xs
      min-[400px]:text-base min-[400px]:mb-2.5
      print:hidden
    ">
      {children}
    </div>
  )
}

export function MoreInfo({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      text-base self-start
      min-[310px]:mb-2.5
      print:hidden
    ">
      {children}
    </div>
  )
}

interface ConnectedInstructionProps {
  mobile: MobileData
  center?: boolean
  children: React.ReactNode
}

export function ConnectedInstruction({ children, mobile, center = false }: ConnectedInstructionProps) {
  return (
    <WhenConnected mobile={mobile}>
      <div className={`
        text-[10px]
        ${center ? 'self-center' : 'self-start'}
        min-[250px]:text-base
        min-[380px]:text-base min-[380px]:mb-2.5
      `}>
        {children}
      </div>
    </WhenConnected>
  )
}

export function Error({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-red-500 text-xs p-2.5 max-w-[350px] max-h-[100px] overflow-scroll">
      {children}
    </div>
  )
}

export function ConnectContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-w-[50px] pb-[30px]">
      {children}
    </div>
  )
}