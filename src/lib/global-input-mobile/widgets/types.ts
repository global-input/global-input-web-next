import type { MobileData } from '../commons'
import { FieldValue } from 'global-input-react'
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




export const convertFieldValueToInputValue = (value: FieldValue): string | number | readonly string[] | undefined => {
  if (value === null) return undefined;
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (Array.isArray(value) && value.every(item => typeof item === 'string')) return value;
  if (typeof value === 'object') return JSON.stringify(value);
  return undefined;
};
export const convertFieldValueToStringValue = (value: FieldValue): string  => {
  if (!value) return '';
  if (typeof value === 'string' || typeof value === 'number') return ''+value;
  else{
    return JSON.stringify(value);

  }
  
};
