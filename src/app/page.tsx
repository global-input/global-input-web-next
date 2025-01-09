'use client'

import React from "react"
import { config } from "@/lib/web-config"
import { PageHeader } from "@/components/page-header"
import { PageFooter } from "@/components/page-footer"
import {
  useConnectToMobile,
  ConnectWindow,
  ConnectButton,
  DisconnectButton,
} from "./mobile-ui"
import { usePageTitle, useCanonicalPage } from "@/lib/page-metadata"
import { PosterImage } from "./poster-image"
import { HowItWorks } from "./how-it-works"
import { CardSection } from "./card-section"

const headerTextContent = {
  title: "Mobile Integration Framework",
  subtitle:
    "Enable secure mobile capabilities in your applications with minimal code changes. Features encrypted QR authentication, dynamic mobile UI generation, and secure data exchange - perfect for streaming services, self-service systems, and IoT applications.",
}

export default function HomePage() {
  const mobile = useConnectToMobile()

  // Set the page title
  usePageTitle(
    "Global Input App - Introducing Mobile Interoperability into Web and Device Applications"
  )

  // Manage canonical link
  useCanonicalPage("https://globalinput.co.uk/")

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen bg-[#72a4d2] 
                    min-[880px]:bg-white min-[880px]:bg-[url('/images/headerBackground-1440.svg')] min-[880px]:bg-no-repeat min-[880px]:bg-cover">
      <PageHeader selected={config.paths.home.path} />
      <div className="w-full flex flex-col justify-start items-start flex-1">
        <PosterImage />
        <div className="flex flex-col justify-center text-white h-[90vh] ml-[20vw] whitespace-pre-wrap">
          <div className="text-[65px] font-black pb-[30px] leading-[65px] w-[25vw]
                         max-[1258px]:text-[40px] max-[1258px]:leading-[40px]
                         max-[900px]:w-[50vw]">
            {headerTextContent.title}
          </div>
          <div className="text-xl pb-[3px] leading-7 w-[25vw] text-[#fffe]
                         max-[900px]:w-[50vw]">
            {headerTextContent.subtitle}
          </div>
          <div className="flex flex-row mt-[30px]
                         min-[300px]:w-[260px]
                         min-[500px]:w-[340px]
                         min-[650px]:w-[370px]">
            <ConnectButton label="Connect Mobile" mobile={mobile} />
            <ConnectWindow mobile={mobile} />
            <DisconnectButton mobile={mobile} />
          </div>
        </div>

        <CardSection />
        <HowItWorks />
      </div>
      <PageFooter />
    </div>
  )
}