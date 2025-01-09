'use client'

import { GenerateQRCodeImage, EncryptImage, DecryptImage } from './icons'

interface TipItemProps {
  icon: React.ReactNode
  children: React.ReactNode
}

function TipItem({ icon, children }: TipItemProps) {
  return (
    <div className="flex items-start gap-4 mb-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 text-sm text-gray-700">
        {children}
      </div>
    </div>
  )
}

export function TipsOnButton() {
  return (
    <div className="space-y-6 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Utilise the buttons displayed on your mobile screen to perform the following secure encryption and decryption operations:
      </h2>
      
      <TipItem icon={<GenerateQRCodeImage />}>
        Encrypt a short piece of content using your mobile device, then send it to this application to generate an Encrypted QR Code. 
        This QR Code can only be decrypted by your mobile device, ensuring secure sharing.
      </TipItem>

      <TipItem icon={<EncryptImage />}>
        Encrypt content on your mobile and securely send it to this application for storage. 
        This allows you to store sensitive information with the confidence that only your mobile can decrypt it.
      </TipItem>

      <TipItem icon={<DecryptImage />}>
        Use this application to send an encrypted piece of content to your mobile for decryption. 
        Your mobile decrypts the content and securely sends the decrypted result back to this application.
      </TipItem>
    </div>
  )
}