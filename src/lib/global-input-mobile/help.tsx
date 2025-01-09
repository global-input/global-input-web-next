'use client'

import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ExpandIconProps {
  expand: boolean
  onClick: () => void
}

const ExpandIcon = ({ expand, onClick }: ExpandIconProps) => (
  <div
    onClick={onClick}
    className={twMerge(
      "box-border relative inline-block bg-white cursor-pointer",
      "w-[22px] h-[22px] border-2 border-solid rounded-full -top-[5px] mr-[5px]",
      "text-[rgb(77,104,206)]",
      expand ? "rotate-90" : "rotate-0",
      "after:content-[''] after:block after:box-border after:absolute",
      "after:w-[6px] after:h-[6px] after:border-b-2 after:border-r-2 after:border-solid",
      "after:rotate-[-45deg] after:left-[5px] after:top-[6px]"
    )}
  />
)

interface HelpProps {
  expandId: string
  expand: string
  setExpand: (expand: string) => void
  children?: React.ReactNode
}

export const Help = ({ children, expandId, expand, setExpand }: HelpProps) => {
  const isExpanded = expand === expandId
  const toggle = () => setExpand(isExpanded ? "" : expandId)

  return (
    <div className="relative -top-[20px] flex flex-row justify-start items-start flex-wrap">
      <ExpandIcon expand={isExpanded} onClick={toggle} />
      <div
        className={twMerge(
          "font-avenir text-[rgb(53,116,230)] whitespace-normal text-xs min-[500px]:text-sm",
          isExpanded ? "inline" : "hidden"
        )}
      >
        {children}
      </div>
    </div>
  )
}