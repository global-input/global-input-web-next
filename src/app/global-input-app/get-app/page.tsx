'use client'

import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { PageHeader } from "@/components/page-header"
import { PageFooter } from "@/components/page-footer"
import { useConnectToMobile } from "./mobile-ui"
import { config } from "@/lib/web-config"
import { usePageTitle } from "@/lib/page-metadata"

const ButtonLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="m-0"
  >
    {children}
  </a>
)

const WebAppBadge = () => (
  <ButtonLink href="https://app.globalinput.co.uk/global-input-app/mobile-app" >
    <div className="w-[145px] h-[48px] cursor-pointer hover:opacity-80">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 48">
        <rect width="145" height="48" rx="8" fill="#000000"/>
        <circle cx="24" cy="24" r="10" fill="none" stroke="#FFFFFF" strokeWidth="1.5"/>
        <path d="M14 24 h20 M24 14 v20" stroke="#FFFFFF" strokeWidth="1.5"/>
        <path d="M16 24 a8 8 0 0 0 16 0 a8 8 0 0 0 -16 0" stroke="#FFFFFF" strokeWidth="1.5" fill="none"/>
        <text x="42" y="28" fontFamily="Arial, sans-serif" fontSize="16" fill="#FFFFFF" fontWeight="500">Web App</text>
      </svg>
    </div>
  </ButtonLink>
)

export default function GetAppPage() {
  useConnectToMobile()
  usePageTitle("Global Input App - Get It Free")

  return (
    <div className="flex flex-col justify-start items-center w-full text-white bg-[rgb(97,136,204)] min-h-screen
                    min-[600px]:max-[1600px]:bg-white min-[600px]:max-[1600px]:bg-[url('/images/background.svg')] 
                    min-[600px]:max-[1600px]:bg-no-repeat min-[600px]:max-[1600px]:bg-cover">
      <PageHeader selected={config.paths.getAppScreen.path} />
      <div className="flex flex-col justify-start items-center w-[90%] mt-[50px] flex-1
                     min-[1000px]:flex-row min-[1000px]:justify-center min-[1000px]:flex-wrap">
        <div className="p-[15px_5px_5px_5px] mt-[50px] flex flex-col justify-start items-center text-center bg-white text-[#5291cd]
                      w-full min-h-[300px] max-w-[400px] rounded-md
                      min-[1000px]:mx-5 min-[1000px]:max-w-[600px]
                      min-[1200px]:mx-[50px]">
          <Image 
            src="/images/app-icon.png" 
            alt="Global Input App Icon" 
            width={64} 
            height={64} 
            className="mt-2.5"
          />
          <div className="text-xl mt-5">Global Input App</div>
          <div className="w-[90%] flex-1 text-sm mt-5 text-left">
            Free, open-source mobile app for secure device control and data management.
          </div>
          <div className="w-[90%] flex flex-col mb-[5px] justify-between items-center mt-5 min-[1000px]:hidden">
            <WebAppBadge />
          </div>
          <div className="w-[90%] flex flex-col mb-[30px] justify-between items-center h-[110px] mt-5
                        min-[360px]:flex-row min-[360px]:h-auto">
            <ButtonLink href={config.links.appdownload.appStore}>
              <Image src="/images/app-store.png" alt="App Store" width={145} height={48} />
            </ButtonLink>
            <div className="max-[999px]:hidden">
              <WebAppBadge />
            </div>
            <ButtonLink href={config.links.appdownload.playStore}>
              <Image src="/images/play-store.png" alt="Play Store" width={145} height={48} />
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-center w-[90%] mt-[50px] flex-1
                     min-[1000px]:flex-row min-[1000px]:justify-center min-[1000px]:flex-wrap">
        <div className="p-[15px_5px_5px_5px] mt-[50px] flex flex-col justify-start items-center text-center bg-white text-[#5291cd]
                      w-full min-h-[300px] max-w-[400px] rounded-md
                      min-[1000px]:mx-5
                      min-[1200px]:mx-[50px]">
          <Image 
            src="/images/extension.png" 
            alt="Browser Extension" 
            width={64} 
            height={64} 
            className="mt-2.5"
          />
          <div className="text-xl mt-5">Developer Resources</div>
          <div className="w-[90%] flex-1 text-sm mt-5 text-left">
            Complete toolkit for adding mobile capabilities to your applications.
          </div>
          <div className="w-[90%] flex flex-col mb-[30px] justify-between items-center h-[110px] mt-5
                        min-[360px]:flex-row min-[360px]:h-auto">
            <ButtonLink href={config.links.jsExtension.url}>
              <Image src="/images/js-module.png" alt="JavaScript Modules" width={145} height={48} />
            </ButtonLink>
            <ButtonLink href={config.links.chromeExtension.url}>
              <Image src="/images/web-store.png" alt="Web Store" width={145} height={48} />
            </ButtonLink>
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  )
}