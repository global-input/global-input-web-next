'use client'

import { config } from "@/lib/web-config"
import { useConnectToMobile, ConnectWindow, ConnectButton } from "./mobile-ui"
import { PageHeader } from "@/components/page-header"
import { PageFooter } from "@/components/page-footer"
import { usePageTitle } from "@/lib/page-metadata"

const BulletItem = ({ children }: { children: React.ReactNode }) => (
  <li className="py-2 m-0 text-lg leading-relaxed before:content-[\'•\'] before:pr-[15px] before:text-white">
    {children}
  </li>
)

export default function PrivacyPage() {
  const mobile = useConnectToMobile()
  usePageTitle("Global Input App - Privacy Policy")

  return (
    <div className="min-h-screen bg-[rgb(114,164,210)] min-[880px]:bg-white min-[880px]:bg-[url('/images/background.svg')] min-[880px]:bg-no-repeat min-[880px]:bg-cover min-[880px]:bg-fixed min-[1900px]:bg-[length:150%]">
      <PageHeader selected={config.paths.privacy.path} />
      <div className="flex flex-col justify-start max-w-full min-h-screen py-[100px] px-[8vw] bg-[#758FD7] min-[880px]:px-[20vw]">
        <div className="text-white">
          <h1 className="text-[65px] font-black pb-[50px] leading-[65px] max-[1258px]:text-[40px] max-[1258px]:leading-[40px]">
            Privacy Policy
          </h1>

          <h2 className="text-[32px] font-bold py-10 pb-5 leading-tight text-white">
            Our Privacy Commitment
          </h2>
          <p className="text-lg leading-relaxed mb-5 text-[#fffe]">
            This Privacy Policy describes how Iterative Solution Limited handles information in the Global Input App ecosystem. Our core commitments:
          </p>
          <ul className="list-none pl-5 mb-[30px] text-[#fffe]">
            <BulletItem>No data collection or server storage</BulletItem>
            <BulletItem>All data stays on user devices</BulletItem>
            <BulletItem>End-to-end encryption for all communications</BulletItem>
          </ul>

          <h2 className="text-[32px] font-bold py-10 pb-5 leading-tight text-white">
            App Permissions
          </h2>
          <p className="text-lg leading-relaxed mb-5 text-[#fffe]">
            The app requires minimal permissions:
          </p>
          <ul className="list-none pl-5 mb-[30px] text-[#fffe]">
            <BulletItem>Internet access for device communication</BulletItem>
            <BulletItem>Camera access for QR code scanning only</BulletItem>
            <BulletItem>No other permissions needed or requested</BulletItem>
          </ul>

          <h2 className="text-[32px] font-bold py-10 pb-5 leading-tight text-white">
            Data Security
          </h2>
          <p className="text-lg leading-relaxed mb-5 text-[#fffe]">
            Security is built into every aspect:
          </p>
          <ul className="list-none pl-5 mb-[30px] text-[#fffe]">
            <BulletItem>End-to-end encryption for all device communications</BulletItem>
            <BulletItem>Local device storage only with encrypted keys</BulletItem>
            <BulletItem>HTTPS protocol for added security layer</BulletItem>
            <BulletItem>User-provided password protection</BulletItem>
          </ul>

          <h2 className="text-[32px] font-bold py-10 pb-5 leading-tight text-white">
            User Control
          </h2>
          <p className="text-lg leading-relaxed mb-5 text-[#fffe]">
            You have complete control of your data:
          </p>
          <ul className="list-none pl-5 mb-[30px] text-[#fffe]">
            <BulletItem>All data stored locally on your device</BulletItem>
            <BulletItem>Encryption keys never leave your device</BulletItem>
            <BulletItem>Direct data deletion through app controls</BulletItem>
            <BulletItem>No server-side data recovery needed</BulletItem>
          </ul>

          <h2 className="text-[32px] font-bold py-10 pb-5 leading-tight text-white">
            Third-Party Components
          </h2>
          <p className="text-lg leading-relaxed mb-5 text-[#fffe]">
            We use only essential third-party components:
          </p>
          <ul className="list-none pl-5 mb-[30px] text-[#fffe]">
            <BulletItem>No data collection by third-party code</BulletItem>
            <BulletItem>Platform metrics only (App Store, Play Store)</BulletItem>
            <BulletItem>Minimal AWS service logging</BulletItem>
            <BulletItem>Compliance with Play Store policies</BulletItem>
          </ul>

          <h2 className="text-[32px] font-bold py-10 pb-5 leading-tight text-white">
            Data Sharing
          </h2>
          <p className="text-lg leading-relaxed mb-5 text-[#fffe]">
            Your data remains yours:
          </p>
          <ul className="list-none pl-5 mb-[30px] text-[#fffe]">
            <BulletItem>No third-party data sharing</BulletItem>
            <BulletItem>User-initiated sharing only</BulletItem>
            <BulletItem>End-to-end encrypted transfers</BulletItem>
            <BulletItem>No data sales or transfers</BulletItem>
          </ul>

          <h2 className="text-[32px] font-bold py-10 pb-5 leading-tight text-white">
            Policy Updates
          </h2>
          <p className="text-lg leading-relaxed mb-5 text-[#fffe]">
            We may update this policy periodically. Continued use of the app constitutes acceptance of any updates.
          </p>

          <h2 className="text-[32px] font-bold py-10 pb-5 leading-tight text-white">
            Contact Us
          </h2>
          <div className="text-lg leading-relaxed my-5 ml-5 mb-20">
            <div className="mb-4">
              <strong>Email:</strong>{" "}
              <a href="mailto:info@iterativesolution.co.uk" className="text-[#fffe] underline hover:text-white">
                info@iterativesolution.co.uk
              </a>
            </div>
            <div className="mb-4">
              <strong>Phone:</strong> +44 (0) 20 3290 6278
            </div>
            <div className="mb-4">
              <strong>Address:</strong>
              <div className="ml-[50px]">
                <div className="mb-[5px]">Iterative Solution Limited</div>
                <div className="mb-[5px]">Kemp House, 124 City Road</div>
                <div className="mb-[5px]">London, EC1V 2NX</div>
              </div>
            </div>
          </div>

          <ConnectButton mobile={mobile} label="Connect Mobile" />
          <ConnectWindow mobile={mobile} />
        </div>
      </div>
      <PageFooter />
    </div>
  )
}