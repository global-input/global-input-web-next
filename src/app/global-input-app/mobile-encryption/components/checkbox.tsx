'use client'

import React from 'react'
import type { ChangeEvent } from 'react'

interface CheckBoxProps {
    label: string
    checked: boolean
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void
}

export function CheckBox({ label = '', checked, onChange }: CheckBoxProps) {
    return (
        <label className="
            block relative pl-[35px] mb-3 cursor-pointer text-[22px]
            select-none
        ">
            {label}
            <input 
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="
                    absolute opacity-0 cursor-pointer h-0 w-0
                    peer
                "
            />
            <span className="
                absolute top-0 left-0 h-[38px] w-[38px] bg-[#eee]
                group-hover:bg-[#ccc]
                peer-checked:bg-[#2196F3]
                after:content-['']
                after:absolute
                after:hidden
                peer-checked:after:block
                after:left-[12px]
                after:top-0
                after:w-[15px]
                after:h-[30px]
                after:border-solid
                after:border-white
                after:border-r-[3px]
                after:border-b-[3px]
                after:rotate-45
            "/>
        </label>
    )
}