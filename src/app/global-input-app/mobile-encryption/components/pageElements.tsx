'use client'

import React from 'react'
import { WhenConnected } from '@/lib/global-input-mobile'
import type { MobileData } from '@/lib/global-input-mobile'
import { twMerge } from 'tailwind-merge'

export const AppContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col justify-start items-center min-h-screen w-full bg-[rgb(219,240,240)]">
        <div className="flex flex-col justify-center text-center min-[340px]:pt-2.5 min-[500px]:pt-10">
            <div className="text-[32px] text-[#445566] font-georgia print:hidden">Mobile Encryption</div>
        </div>
        <div className="w-full flex flex-col justify-center items-center p-2.5 flex-1">
            <div className="w-[95%] flex flex-col justify-center items-center p-2.5 flex-1">
                {children}
            </div>
        </div>
        <div className="mx-4 px-4 text-[#153E85] font-light font-georgia text-[8px] min-[150px]:text-xs min-[400px]:text-base print:hidden">
            <a 
                href="https://github.com/global-input/mobile-encryption"
                rel="noreferrer noopener"
                target="_blank"
                className="text-[#153E85] hover:text-[#2855b9]"
            >
                View on GitHub
            </a>: explore the source code of the web application currently displayed on your computer browser, 
            which accepts connections from the Global Input App for encryption and decryption purposes.
        </div>
    </div>
)

export function Title({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={twMerge(`
            text-xs text-[#445566] font-georgia self-start
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
        <div className="text-base self-start min-[310px]:mb-2.5 print:hidden">
            {children}
        </div>
    )
}

interface InstructionProps {
    center?: boolean
    children: React.ReactNode
}

function Instruction({ center = false, children }: InstructionProps) {
    return (
        <div className={`text-[10px] ${center ? 'self-center' : 'self-start'}
            min-[250px]:text-base
            min-[380px]:text-base min-[380px]:mb-2.5
        `}>
            {children}
        </div>
    )
}

interface ConnectedInstructionProps {
    mobile: MobileData
    center?: boolean
    children?: React.ReactNode
}

export function ConnectedInstruction({ children, mobile, center = false }: ConnectedInstructionProps) {
    return (
        <WhenConnected mobile={mobile}>
            <Instruction center={center}>
                {children}
            </Instruction>
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