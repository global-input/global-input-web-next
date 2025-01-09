'use client'

export { CheckBox } from './checkbox'

interface FormProps {
  children: React.ReactNode
  className?: string
}

export function Form({ children, className = '' }: FormProps) {
  return (
    <div className={`
      flex flex-col justify-start items-start p-2.5 w-[80vw] overflow-scroll
      print:hidden
      ${className}
    `}>
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

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ className = '', ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`
        block leading-8 m-0 pl-2.5 w-full h-[100px] text-base
        border-2 border-solid border-[rgb(230,230,230)]
        bg-[rgb(249,249,249)] rounded
        box-border font-medium
        focus:border focus:border-solid focus:border-[#2c7ac9]
        placeholder-shown:+ .control-label:invisible
        placeholder-shown:+ .control-label:-z-10
        placeholder-shown:+ .control-label:transition-[0.2s_ease-in-out]
        not-placeholder-shown:+ .control-label:visible
        not-placeholder-shown:+ .control-label:z-10
        not-placeholder-shown:+ .control-label:opacity-100
        not-placeholder-shown:+ .control-label:translate-x-2.5
        not-placeholder-shown:+ .control-label:-translate-y-[110px]
        not-placeholder-shown:+ .control-label:transition-[0.2s_ease-in-out_transform]
        not-placeholder-shown:+ .control-label:bg-white
        ${className}
      `}
    />
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`
        block leading-8 m-0 pl-2.5 w-full text-base
        border-2 border-solid border-[rgb(230,230,230)]
        bg-[rgb(249,249,249)] rounded
        box-border font-medium
        focus:border focus:border-solid focus:border-[#2c7ac9]
        placeholder-shown:+ .control-label:invisible
        placeholder-shown:+ .control-label:-z-10
        placeholder-shown:+ .control-label:transition-[0.2s_ease-in-out]
        not-placeholder-shown:+ .control-label:visible
        not-placeholder-shown:+ .control-label:z-10
        not-placeholder-shown:+ .control-label:opacity-100
        not-placeholder-shown:+ .control-label:translate-x-2.5
        not-placeholder-shown:+ .control-label:-translate-y-[48px]
        not-placeholder-shown:+ .control-label:transition-[0.2s_ease-in-out_transform]
        not-placeholder-shown:+ .control-label:bg-white
        ${className}
      `}
    />
  )
}

export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label 
      htmlFor={htmlFor}
      className="control-label inline-block opacity-0 text-[rgb(53,116,230)] transition-[0.2s_ease-in-out_transform] text-xs w-auto px-[5px]"
    >
      {children}
    </label>
  )
}

const buttonBaseClasses = `
  text-decoration-none text-[11px] rounded-lg text-[#4281BD] bg-white whitespace-nowrap
  p-2.5 flex-row justify-center items-center border-[#EEEEEE]
  flex min-w-[50px] max-w-[200px] mx-[5px]
  shadow-[0px_8px_15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out cursor-pointer
  font-['Roboto',sans-serif]
  hover:transform hover:-translate-y-[3px] hover:shadow-[0_0_50px_#ffff]
`

const bigButtonClasses = `
  ${buttonBaseClasses}
  border-0 text-[15px]
`

export function DarkButton({ onClick, children, className = '' }: { 
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`${bigButtonClasses} bg-[rgb(208,226,247)] ${className}`}
    >
      {children}
    </button>
  )
}

export function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex m-0 flex-row justify-between w-full items-center pb-[50px] print:hidden">
      {children}
    </div>
  )
}

export function InputGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full pt-5">
      {children}
    </div>
  )
}