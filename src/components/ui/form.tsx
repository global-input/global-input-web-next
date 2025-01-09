'use client'

import { twMerge } from 'tailwind-merge'
import type { ChangeEvent } from 'react'

interface CheckBoxProps {
  label: string
  checked: boolean
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void
}

export function CheckBox({ label = '', checked, onChange }: CheckBoxProps) {
  return (
    <label className="block relative pl-[35px] mb-3 cursor-pointer text-[22px] select-none">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute opacity-0 cursor-pointer h-0 w-0 peer"
      />
      <span className="
        absolute top-0 left-0 h-[38px] w-[38px] bg-[#eee] 
        hover:bg-[#ccc] peer-checked:bg-[#2196F3]
        after:content-[''] after:absolute after:hidden
        peer-checked:after:block
        after:left-[12px] after:top-0 after:w-[15px] after:h-[30px]
        after:border-solid after:border-white after:border-r-[3px] after:border-b-[3px]
        after:rotate-45
      "/>
    </label>
  )
}

export function Form({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge("flex flex-col justify-start items-start p-2.5 w-[80vw] overflow-scroll print:hidden", className)}>
      {children}
    </div>
  )
}

export function Field({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full flex flex-col justify-start items-start">
      {children}
    </div>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        className={twMerge(`
          block leading-8 m-0 pl-2.5 w-full text-base
          border-2 border-solid border-[rgb(230,230,230)]
          bg-[rgb(249,249,249)] rounded
          box-border font-medium
          focus:border focus:border-solid focus:border-[#2c7ac9]
          placeholder-shown:+ [&_+_label]:invisible
          placeholder-shown:+ [&_+_label]:-z-10
          placeholder-shown:+ [&_+_label]:transition-[0.2s_ease-in-out]
          not-placeholder-shown:+ [&_+_label]:visible
          not-placeholder-shown:+ [&_+_label]:z-10
          not-placeholder-shown:+ [&_+_label]:opacity-100
          not-placeholder-shown:+ [&_+_label]:translate-x-2.5
          not-placeholder-shown:+ [&_+_label]:-translate-y-[48px]
          not-placeholder-shown:+ [&_+_label]:transition-[0.2s_ease-in-out_transform]
          not-placeholder-shown:+ [&_+_label]:bg-white
        `, className)}
      />
      {label && (
        <label className="control-label inline-block opacity-0 text-[rgb(53,116,230)] transition-[0.2s_ease-in-out_transform] text-xs px-[5px]">
          {label}
        </label>
      )}
    </div>
  )
}

export function TextArea({ label, className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <div className="relative w-full">
      <textarea
        {...props}
        className={twMerge(`
          block leading-8 m-0 pl-2.5 w-full h-[100px] text-base
          border-2 border-solid border-[rgb(230,230,230)]
          bg-[rgb(249,249,249)] rounded
          box-border font-medium
          focus:border focus:border-solid focus:border-[#2c7ac9]
          placeholder-shown:+ [&_+_label]:invisible
          placeholder-shown:+ [&_+_label]:-z-10
          placeholder-shown:+ [&_+_label]:transition-[0.2s_ease-in-out]
          not-placeholder-shown:+ [&_+_label]:visible
          not-placeholder-shown:+ [&_+_label]:z-10
          not-placeholder-shown:+ [&_+_label]:opacity-100
          not-placeholder-shown:+ [&_+_label]:translate-x-2.5
          not-placeholder-shown:+ [&_+_label]:-translate-y-[110px]
          not-placeholder-shown:+ [&_+_label]:transition-[0.2s_ease-in-out_transform]
          not-placeholder-shown:+ [&_+_label]:bg-white
        `, className)}
      />
      {label && (
        <label className="control-label inline-block opacity-0 text-[rgb(53,116,230)] transition-[0.2s_ease-in-out_transform] text-xs px-[5px]">
          {label}
        </label>
      )}
    </div>
  )
}

export function Footer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge("flex m-0 flex-row justify-between w-full items-center pb-[50px] print:hidden", className)}>
      {children}
    </div>
  )
}

export function InputGroup({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge("flex flex-row w-full pt-5", className)}>
      {children}
    </div>
  )
}