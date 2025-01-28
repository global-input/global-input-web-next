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
      Utilize the buttons displayed on your mobile screen to perform the following secure encryption and decryption operation
      </h2>
      
      <TipItem icon={<GenerateQRCodeImage />}>
      When you press this button (on your mobile), you can encrypt a short piece of content using your mobile device, then send it to this application. The application will generate an Encrypted QR Code that can only be decrypted by your mobile device, enabling secure peer-to-peer sharing.        
      </TipItem>

      <TipItem icon={<EncryptImage />}>
      When you press this button(on your mobile), you can encrypt content on your mobile device and securely send it to this application for storage. This allows you to store sensitive information with the confidence that only your mobile device can decrypt it.        
      </TipItem>

      <TipItem icon={<DecryptImage />}>
      When you press this button(on your mobile), this application will send an encrypted piece of content to your mobile device for decryption. Your mobile device will decrypt the content and securely send the decrypted result back to this application.        
      </TipItem>
    </div>
  )
}