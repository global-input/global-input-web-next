'use client'

import React from 'react'
import { twMerge } from 'tailwind-merge'

interface HelpContainerProps {
    position?: number
    children: React.ReactNode
}

function HelpContainer({ position = 1, children }: HelpContainerProps) {
    const baseClasses = "flex flex-col justify-start items-start"
    const positionClasses = {
        1: "",
        2: "relative -top-[25px] pr-[100px]",
        3: "relative -top-[12px]"
    }[position]

    return (
        <div className={twMerge(baseClasses, positionClasses)}>
            {children}
        </div>
    )
}

interface ExpandIconProps {
    expanded: boolean
    onClick: () => void
}

function ExpandIcon({ expanded, onClick }: ExpandIconProps) {
    return (
        <div
            onClick={onClick}
            className={`
                box-border relative inline-block border border-red-500 bg-white cursor-pointer
                w-[22px] h-[22px] border-2 rounded-full -top-[18px] mr-[5px]
                text-[rgb(77,104,206)]
                ${expanded ? 'rotate-90' : 'rotate-0'}
                after:content-[""] after:block after:box-border after:absolute
                after:w-[6px] after:h-[6px] after:border-b-2 after:border-r-2
                after:rotate-[-45deg] after:left-[5px] after:top-[6px]
            `}
        />
    )
}

interface HelpContentProps {
    expanded: boolean
    children: React.ReactNode
}

function HelpContent({ expanded, children }: HelpContentProps) {
    return (
        <div className={`
            font-['Avenir'] text-[rgb(53,116,230)] whitespace-normal text-xs
            min-[500px]:text-sm relative -top-[35px] left-[30px]
            ${expanded ? 'inline' : 'hidden'}
        `}>
            {children}
        </div>
    )
}

interface HelpProps {
    expandId: string
    expand: string
    setExpand: (expand: string) => void
    position?: number
    children?: React.ReactNode
}

export function Help({ children, expandId, expand, setExpand, position = 1 }: HelpProps) {
    const isExpanded = expand === expandId
    const toggle = () => setExpand(isExpanded ? '' : expandId)
    
    return (
        <HelpContainer position={position}>
            <ExpandIcon
                expanded={isExpanded}
                onClick={toggle}
            />
            <HelpContent expanded={isExpanded}>
                {children}
            </HelpContent>
        </HelpContainer>
    )
}