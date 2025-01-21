'use client'

import { QRCodeSVG } from 'qrcode.react'
import { ScanInstructionProps, QROverlayProps } from './types'

const ButtonLike = ({ onClick, children }: {
  onClick: () => void
  children: React.ReactNode
}) => (
  <button
    onClick={onClick}
    className={`
      text-white bg-[rgb(24,47,73)] border-none rounded 
      px-2 py-0.5 text-inherit no-underline cursor-pointer 
      inline-block border border-dotted border-[#ccc] 
      text-[#4872d3] ml-[5px]
      hover:bg-[rgb(186,208,232)]
    `}
  >
    {children}
  </button>
)

const A = ({ onClick, children }: {
  onClick: () => void
  children: React.ReactNode
}) => (
  <span
    onClick={onClick}
    className="text-[#285dd7] underline cursor-pointer ml-[5px]"
  >
    {children}
  </span>
)

export const AppScanInstruction = ({ 
  onGlobalInputAppClick, 
  variant = 'button' 
}: ScanInstructionProps) => (
  <div className="flex flex-row items-center justify-center mt-2.5 mb-2.5 text-[#4872d3]">
    Scan with 
    {variant === 'button' ? (
      <ButtonLike onClick={onGlobalInputAppClick}>
        Global Input App
      </ButtonLike>
    ) : (
      <A onClick={onGlobalInputAppClick}>
        Global Input App
      </A>
    )}
  </div>
)

export const AppQROverlay = ({
  showOverlay,
  onOverlayClick,
  onContainerClick,
  onClickCapture,
  qrValue,
  qrSize = 250
}: QROverlayProps) => {
  if (!showOverlay) return null
  
  return (
    <div 
      className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex flex-col justify-center items-center pb-20"
      onClick={onOverlayClick}
    >
      <div className="bg-white p-5 text-[#4872d3] text-base pt-5 pb-2.5 pl-2.5" onClick={onOverlayClick}>
        Scan the QR code below with your phone's camera to launch the Global Input App. 
        Launching the app or clicking <ButtonLike onClick={onOverlayClick}>here</ButtonLike> will reveal the QR code for the app to scan.
      </div>
      <div 
        className="bg-white p-5 rounded-xl flex flex-col items-center text-center"
        onClick={onContainerClick}
        onClickCapture={onClickCapture}
      >
        <QRCodeSVG value={qrValue} size={qrSize} />
      </div>
    </div>
  )
}