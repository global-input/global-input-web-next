'use client'

import React, { useState, useRef, useEffect } from 'react'

interface Props {
    value: string
    position?: number
    children: React.ReactNode
}

function CopyContainer({ 
    position = 1, 
    children, 
    show 
}: { 
    position?: number
    children: React.ReactNode
    show: boolean 
}) {
    const baseClasses = "flex flex-row relative items-center z-[5] pl-[5px]"
    const showClasses = show ? "bg-white border border-dotted border-[#4040bf]" : ""
    
    const positionClasses = {
        1: "inline-flex self-end -top-4",
        2: "inline-flex self-end -top-7",
        3: "flex items-start"
    }[position]

    return (
        <div className={`${baseClasses} ${showClasses} ${positionClasses}`}>
            {children}
        </div>
    )
}

function CopyContent({ show, children }: { show: boolean; children: React.ReactNode }) {
    return (
        <div className={`
            font-['Avenir'] text-[#4040bf] whitespace-normal text-xs pr-2.5
            ${show ? 'block' : 'hidden'}
        `}>
            {children}
        </div>
    )
}

function CopyButton({ 
    show, 
    onClick 
}: { 
    show: boolean
    onClick: () => void 
}) {
    return (
        <button
            onClick={onClick}
            className={`
                text-decoration-none text-[10px] rounded-lg text-[#4281BD] bg-white whitespace-nowrap
                p-[5px] flex flex-row justify-center items-center border-[#EEEEEE]
                shadow-[0px_8px_15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out cursor-pointer
                font-['Roboto',sans-serif] hover:transform hover:-translate-y-[3px] hover:shadow-[0_0_50px_#ffff]
                ${show ? 'visible' : 'invisible'}
                flex
            `}
        >
            Copy
        </button>
    )
}

export function CopyToClipboardButton({ children, value, position = 1 }: Props) {
    const [copying, setCopying] = useState(false)
    const timerHandler = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (timerHandler.current) {
                clearTimeout(timerHandler.current)
                timerHandler.current = null
            }
        }
    }, [])

    const onCopy = () => {
        setCopying(true)
        navigator.clipboard.writeText(value)
        timerHandler.current && clearTimeout(timerHandler.current)
        timerHandler.current = setTimeout(() => {
            timerHandler.current = null
            setCopying(false)
        }, 2000)
    }

    return (
        <CopyContainer show={copying} position={position}>
            <CopyContent show={copying}>
                copied into your clipboard
            </CopyContent>
            <CopyButton 
                onClick={onCopy} 
                show={(!copying) && !!navigator.clipboard && !!value} 
            />
        </CopyContainer>
    )
}