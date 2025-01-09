import type { MobileData } from '../commons'

export interface ConnectWidgetProps {
  mobile: MobileData
}

export interface ButtonProps {
  label?: string
  skin?: string
  mobile: MobileData
}

export interface WhenProps {
  mobile: MobileData
  children: React.ReactNode
}

export interface ScanInstructionProps {
  onGlobalInputAppClick: () => void
  variant?: 'link' | 'button'
}

export interface QROverlayProps {
  showOverlay: boolean
  onOverlayClick: () => void
  onContainerClick: (e: React.MouseEvent) => void
  onClickCapture?: () => void
  qrValue: string
  qrSize?: number
}