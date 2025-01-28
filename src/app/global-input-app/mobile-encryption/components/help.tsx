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
                inline-flex items-center justify-center
                w-6 h-6 
                text-blue-600 hover:text-blue-700
                cursor-pointer
                transition-transform duration-200
                ${expanded ? 'rotate-90' : 'rotate-0'}
            `}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="w-5 h-5"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </div>
    );
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