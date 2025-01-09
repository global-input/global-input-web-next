'use client'

import Image from 'next/image'
import Link from 'next/link'
import { config } from '@/lib/web-config'

const textContent = {
  authentication: {
    title: "Zero-Change Authentication",
    content: [
      "Add mobile-based authentication to existing systems without modifying your authentication infrastructure. Users can securely sign in using their phones while maintaining your current security setup.",
    ],
  },
  mobileControl: {
    title: "Universal Mobile Control",
    content: [
      "Enable mobile input and control in any application with simple JSON-based UI definitions. Perfect for keyboard-intensive operations in streaming apps and IoT devices.",
    ],
  },
  secondScreen: {
    title: "Instant Second Screen Integration",
    content: [
      "Add mobile interaction to streaming apps and devices with just a few lines of code. No infrastructure changes needed - perfect for Smart TVs, gaming consoles, and streaming devices.",
    ],
  },
  encryption: {
    title: "Zero-Server Encryption",
    content: [
      "Enable end-to-end encrypted data handling without managing encryption infrastructure. Keys stay on users' devices, simplifying compliance and reducing server-side complexity.",
    ],
  },
  mobilePersonStorage: {
    title: "GDPR-Ready Data Handling",
    content: [
      "Minimize compliance overhead by letting users manage their personal data on their devices. Perfect for handling sensitive information without server-side storage requirements",
    ],
  },
  mobileContentTransfer: {
    title: "Secure Cross-Device Transfer",
    content: [
      "Enable direct, encrypted content sharing between devices without additional infrastructure. Perfect for streaming services and multi-device environments",
    ],
  },
}

const Card = ({ href, icon: Icon, title, content }: {
  href: string
  icon: React.ComponentType
  title: string
  content: string[]
}) => (
  <Link
    href={href}
    className="flex flex-col justify-start items-center text-center bg-white text-[#5291cd] h-[300px] rounded-md
               mt-2.5 mb-[50px] w-[95%] pb-[30px] max-w-[330px] no-underline
               transition-all duration-150 ease-out hover:shadow-[0_0_30px_#0003] hover:-translate-y-[3px]
               max-[800px]:mb-2.5"
  >
    <Icon />
    <div className="text-xl mt-5 px-5">{title}</div>
    <div className="flex-1 text-sm px-4 pt-2.5 w-full overflow-hidden">
      {content}
    </div>
    <div className="w-full text-[#a8a8a8] flex flex-row justify-center pt-2">
      <div className="text-[#5291cd] flex flex-row justify-start items-end whitespace-nowrap text-sm">
        Learn More <Image src="/images/arrow.svg" alt="Arrow" width={20} height={20} />
      </div>
    </div>
  </Link>
)

// Icon components
const Icon = ({ src, alt }: { src: string; alt: string }) => (
  <Image src={src} alt={alt} width={50} height={50} className="mt-5" />
)

const AuthenticationIcon = () => <Icon src="/images/authentication.svg" alt="Authentication Icon" />
const ControlIcon = () => <Icon src="/images/control.svg" alt="Mobile Control Icon" />
const SecondScreenIcon = () => <Icon src="/images/second-screen.svg" alt="Second Screen Icon" />
const EncryptionIcon = () => <Icon src="/images/encryption.png" alt="Encryption Icon" />
const StorageIcon = () => <Icon src="/images/personal-storage.png" alt="Storage Icon" />
const TransferIcon = () => <Icon src="/images/transfer.png" alt="Transfer Icon" />

export function CardSection() {
  return (
    <div className="flex flex-col justify-start items-center w-full">
      <div className="flex flex-col justify-start items-center max-w-[780px]
                     min-[800px]:flex-row min-[800px]:flex-wrap min-[800px]:justify-around min-[800px]:p-5
                     min-[1400px]:max-w-[1200px]">
        <Card
          href={config.paths.mobileAuthentication.path}
          icon={AuthenticationIcon}
          title={textContent.authentication.title}
          content={textContent.authentication.content}
        />
        <Card
          href={config.paths.mobileControl.path}
          icon={ControlIcon}
          title={textContent.mobileControl.title}
          content={textContent.mobileControl.content}
        />
        <Card
          href={config.paths.secondScreen.path}
          icon={SecondScreenIcon}
          title={textContent.secondScreen.title}
          content={textContent.secondScreen.content}
        />
        <Card
          href={config.paths.aboutContentEncryption.path}
          icon={EncryptionIcon}
          title={textContent.encryption.title}
          content={textContent.encryption.content}
        />
        <Card
          href={config.paths.mobilePersonalStorage.path}
          icon={StorageIcon}
          title={textContent.mobilePersonStorage.title}
          content={textContent.mobilePersonStorage.content}
        />
        <Card
          href={config.paths.mobileContentTransfer.path}
          icon={TransferIcon}
          title={textContent.mobileContentTransfer.title}
          content={textContent.mobileContentTransfer.content}
        />
      </div>
    </div>
  )
}