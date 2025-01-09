'use client'

import Link from 'next/link'
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const baseStyles = `
  text-[15px] rounded-lg whitespace-nowrap py-[15px] px-[15px] mr-[5px]
  flex flex-row justify-center items-center
  transition-all duration-300 ease-in-out cursor-pointer font-bold
`

const primaryStyles = `
  text-[#4281bd] bg-white hover:bg-[#e3e3e3]
`

const secondaryStyles = `
  border-0 bg-transparent text-white hover:bg-[#fff2]
`

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  className?: string
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export function Button({ 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) {
  const variantStyles = variant === 'primary' ? primaryStyles : secondaryStyles
  return (
    <button
      className={twMerge(baseStyles, variantStyles, className)}
      {...props}
    />
  )
}

export function LinkButton({ 
  href, 
  variant = 'primary', 
  className = '', 
  ...props 
}: LinkButtonProps) {
  const variantStyles = variant === 'primary' ? primaryStyles : secondaryStyles
  return (
    <Link
      href={href}
      className={twMerge(baseStyles, variantStyles, className)}
      {...props}
    />
  )
}