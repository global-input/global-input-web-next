'use client'

export function Tips({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}

export function Tip({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row justify-start items-center py-[5px]">
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
        <div className="text-xs pl-[5px]">
            {children}
        </div>
    )
}