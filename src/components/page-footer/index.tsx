'use client'

import Link from 'next/link'
import { config } from '@/lib/web-config'

type FooterItemProps = {
  href: string
  children: React.ReactNode
  className?: string
}

const FooterItem = ({ href, children, className = '' }: FooterItemProps) => (
  <Link
    href={href}
    className={`mb-2.5 text-[8px] text-white no-underline transition-all duration-300 ease-in-out hover:text-[#e3e3e3] 
    min-[280px]:w-[120px] 
    min-[310px]:w-[140px] min-[310px]:text-[10px] 
    min-[400px]:w-[180px] min-[400px]:text-xs 
    min-[500px]:text-sm 
    min-[1000px]:w-[200px] ${className}`}
  >
    {children}
  </Link>
)

const FooterMobileAuthentication = () => (
  <FooterItem href={config.paths.mobileAuthentication.path}>
    Mobile Authentication
  </FooterItem>
)

const FooterMobileEncryption = () => (
  <FooterItem href={config.paths.aboutContentEncryption.path}>
    Mobile Encryption
  </FooterItem>
)

const FooterSecondScreen = () => (
  <FooterItem href={config.paths.secondScreen.path}>
    Second Screen
  </FooterItem>
)

const FooterMobileInputControl = () => (
  <FooterItem href={config.paths.mobileControl.path}>
    Mobile Input & Control
  </FooterItem>
)

const FooterMobilePersonalStorage = () => (
  <FooterItem href={config.paths.mobilePersonalStorage.path}>
    Mobile Secure Storage
  </FooterItem>
)

const FooterMobileContentTransfer = () => (
  <FooterItem
    href={config.paths.mobileContentTransfer.path}
    className="max-[1000px]:hidden"
  >
    Content Transfer
  </FooterItem>
)

const FooterDownload = () => (
  <FooterItem href={config.paths.getAppScreen.path}>
    Get It Free
  </FooterItem>
)

const FooterPrivacyPolicy = () => (
  <FooterItem href={config.paths.privacy.path}>
    Privacy Policy
  </FooterItem>
)

const FooterContactUs = () => (
  <FooterItem href={config.paths.contactUs.path}>
    Contact Us
  </FooterItem>
)

export function PageFooter() {
  return (
    <div className="pt-[50px] w-full min-h-[300px] text-white flex flex-col justify-end items-center bg-no-repeat bg-auto min-[600px]:bg-cover"
         style={{ backgroundImage: 'url(/images/footer-background.svg)' }}>
      <div className="flex mb-[30px] items-center flex-col
                      min-[280px]:justify-between min-[280px]:flex-row min-[280px]:flex-wrap min-[280px]:w-[95%]
                      min-[500px]:w-[400px]
                      min-[600px]:w-[500px]
                      min-[1000px]:w-[600px]">
        <FooterMobileAuthentication />
        <FooterMobileEncryption />
        <FooterSecondScreen />
        <FooterMobileInputControl />
        <FooterMobilePersonalStorage />
        <FooterMobileContentTransfer />
        <FooterDownload />
        <FooterPrivacyPolicy />
        <FooterContactUs />
      </div>
    </div>
  )
}