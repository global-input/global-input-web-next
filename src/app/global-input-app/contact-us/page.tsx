'use client'

import { PageHeader } from "@/components/page-header"
import { PageFooter } from "@/components/page-footer"
import { useConnectToMobile, ConnectWindow, ConnectButton } from "./mobile-ui"
import { usePageTitle } from "@/lib/page-metadata"
import { config } from "@/lib/web-config"

const Column = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div className="flex flex-col">
    {title && (
      <div className="mt-[50px] text-[26px] mb-[15px]">{title}</div>
    )}
    {children}
  </div>
)

const Line = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[15px] mb-[10px]">{children}</div>
)

export default function ContactUsPage() {
  const mobile = useConnectToMobile()
  usePageTitle("Global Input App - Contact Us")

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen text-white bg-[rgb(97,136,204)]
                  min-[600px]:max-[800px]:bg-white min-[600px]:max-[800px]:bg-[url('/images/background.svg')] 
                  min-[600px]:max-[800px]:bg-no-repeat min-[600px]:max-[800px]:bg-cover">
      <PageHeader selected={config.paths.contactUs.path} />
      <div className="mt-[100px] text-[65px] font-black leading-[65px] max-[1258px]:text-[40px] max-[1258px]:leading-[40px]">
        Contact Us!
      </div>
      <div className="flex flex-col justify-start items-center flex-1 w-full">
        <div className="p-[30px] flex flex-col justify-start items-center w-full 
                      min-[600px]:flex-row min-[600px]:justify-between min-[600px]:w-[500px]
                      min-[1024px]:w-[700px]">
          <Column title="Address">
            <Line>Iterative Solution Limited</Line>
            <Line>Kemp House</Line>
            <Line>124 City Road</Line>
            <Line>London</Line>
            <Line>EC1V 2NX</Line>
          </Column>
          <Column>
            <div>
              <div className="mt-[50px] text-[26px] mb-[15px]">Phone</div>
              <Line>+44 (0) 20 3290 6278</Line>
            </div>
            <div>
              <div className="mt-[50px] text-[26px] mb-[15px]">Email</div>
              <Line>info@iterativesolution.co.uk</Line>
            </div>
          </Column>
        </div>
        <ConnectButton mobile={mobile} label="Connect Mobile" />
        <ConnectWindow mobile={mobile} />
      </div>
      <div className="p-[30px] flex flex-col justify-start items-center w-full 
                    min-[600px]:flex-row min-[600px]:justify-between min-[600px]:w-[500px]
                    min-[1024px]:w-[700px]">
      </div>
      <PageFooter />
    </div>
  )
}