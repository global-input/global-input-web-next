'use client'

import Image from 'next/image'

interface IconProps {
  className?: string
}

export function DecryptIcon({ className }: IconProps) {
  return (
    <Image
      src="/images/decrypt-icon.png"
      alt="Decrypt"
      width={24}
      height={24}
      className={className}
    />
  )
}

export function ShowIcon({ className }: IconProps) {
  return (
    <Image
      src="/images/show-icon.png"
      alt="Encrypt"
      width={24}
      height={24}
      className={className}
    />
  )
}

export function SendIcon({ className }: IconProps) {
  return (
    <Image
      src="/images/send-icon.png"
      alt="Send"
      width={24}
      height={24}
      className={className}
    />
  )
}

export function GenerateQRCodeImage({ className }: IconProps) {
  return (
    <Image
      src="/images/qr-code.png"
      alt="Generate QR Code"
      width={24}
      height={24}
      className={className}
    />
  )
}

export function EncryptImage({ className }: IconProps) {
  return (
    <Image
      src="/images/encrypt.png"
      alt="Encrypt"
      width={24}
      height={24}
      className={className}
    />
  )
}

export function DecryptImage({ className }: IconProps) {
  return (
    <Image
      src="/images/decrypt.png"
      alt="Decrypt"
      width={24}
      height={24}
      className={className}
    />
  )
}