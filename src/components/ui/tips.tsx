'use client'

interface TipsProps {
  children: React.ReactNode
  className?: string
}

export function Tips({ children, className = '' }: TipsProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {children}
    </div>
  )
}

export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row justify-start items-center py-1.5">
      {children}
    </div>
  )
}

export function TipTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs">
      {children}
    </div>
  )
}

export function TipContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs pl-1.5">
      {children}
    </div>
  )
}

interface HelpProps {
  expandId: string
  expand: string
  setExpand: (expand: string) => void
  position?: number
  children: React.ReactNode
}

export function Help({ children, expandId, expand, setExpand, position = 1 }: HelpProps) {
  const isExpanded = expand === expandId
  const toggle = () => setExpand(isExpanded ? '' : expandId)

  const containerStyles = {
    1: 'flex flex-col justify-start items-start',
    2: 'flex flex-col justify-start items-start relative -top-[25px] pr-[100px]',
    3: 'flex flex-col justify-start items-start relative -top-[12px]',
  }[position]

  return (
    <div className={containerStyles}>
      <div 
        onClick={toggle}
        className={`
          box-border relative inline-block bg-white cursor-pointer
          w-[22px] h-[22px] border-2 border-solid rounded-full -top-[18px] mr-[5px]
          text-[rgb(77,104,206)]
          ${isExpanded ? 'rotate-90' : 'rotate-0'}
          after:content-[""] after:block after:box-border after:absolute
          after:w-[6px] after:h-[6px] after:border-b-2 after:border-r-2
          after:rotate-[-45deg] after:left-[5px] after:top-[6px]
        `}
      />
      <div className={`
        font-avenir text-[rgb(53,116,230)] whitespace-normal text-xs
        min-[500px]:text-sm
        relative -top-[35px] left-[30px]
        ${isExpanded ? 'inline' : 'hidden'}
      `}>
        {children}
      </div>
    </div>
  )
}