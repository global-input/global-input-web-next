'use client'

import Image from 'next/image'

const Step = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode
  className?: string 
}) => (
  <div className={`relative flex bg-no-repeat w-[150px] h-[180px] min-[1024px]:w-[200px] min-[1024px]:h-[230px] ${className}`}>
    {children}
  </div>
)

const Footer = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-0 bottom-[10px] min-[1024px]:bottom-[50px] w-full flex flex-row justify-center text-[15px] min-[1024px]:text-xl text-white">
    {children}
  </div>
)

export function HowItWorks() {
  return (
    <div className="w-full h-[500px] flex flex-col justify-start items-center mt-[150px]">
      <div className="flex flex-row justify-center items-center text-white text-[26px] min-[500px]:text-[40px] w-full">
        How It Works
      </div>

      <div className="flex flex-col justify-start pt-[50px] items-center w-full
                    min-[600px]:w-[500px] min-[700px]:w-[600px] min-[800px]:w-[700px]
                    min-[900px]:w-[800px] min-[1024px]:w-[900px]">
        <div className="flex flex-col justify-start items-start w-full
                       min-[600px]:flex-row min-[600px]:justify-between min-[600px]:items-center">
          {/* Step 1 */}
          <Step className="bg-[url('/images/small/1.svg')] bg-[position:20px_85px] -top-[50px] left-[10px]
                          min-[600px]:top-0 min-[600px]:left-0
                          min-[1024px]:bg-[url('/images/1.svg')] min-[1024px]:bg-[position:10px_70px]">
            <div className="bg-[url('/images/small/extension.svg')] bg-[position:35px_70px] bg-no-repeat w-full h-full
                          min-[1024px]:bg-[url('/images/extension.svg')] min-[1024px]:bg-[position:50px_50px]">
              <Footer>Install Extension</Footer>
            </div>
          </Step>

          {/* Step 2 */}
          <Step className="bg-[url('/images/small/2.svg')] bg-[position:15px_38px] -top-[120px] left-[50px]
                          min-[280px]:left-[80px] min-[320px]:-top-[120px] min-[320px]:left-[110px]
                          min-[400px]:-top-[120px] min-[400px]:left-[150px] min-[500px]:-top-[120px] min-[500px]:left-[200px]
                          min-[600px]:top-0 min-[600px]:left-0
                          min-[1024px]:bg-[url('/images/2.svg')] min-[1024px]:bg-[position:15px_15px]">
            <div className="bg-[url('/images/small/qrcode.png')] bg-[position:35px_70px] bg-no-repeat w-full h-full
                          min-[1024px]:bg-[url('/images/qrcode.png')] min-[1024px]:bg-[position:50px_50px]">
              <Footer>Scan QR Code</Footer>
            </div>
          </Step>

          {/* Step 3 */}
          <Step className="bg-[url('/images/small/3.svg')] bg-[position:35px_33px] -top-[160px] left-[70px]
                          min-[280px]:left-[100px] min-[320px]:-top-[180px] min-[320px]:left-[170px]
                          min-[400px]:-top-[180px] min-[400px]:left-[230px] min-[450px]:-top-[160px] min-[450px]:left-[250px]
                          min-[500px]:-top-[180px] min-[500px]:left-[350px]
                          min-[600px]:top-0 min-[600px]:left-0
                          min-[1024px]:bg-[url('/images/3.svg')] min-[1024px]:bg-[position:10px_10px]">
            <div className="bg-[url('/images/mobile.svg')] bg-no-repeat w-full h-full">
              <Footer>Operate with Mobile</Footer>
            </div>
          </Step>
        </div>
      </div>
    </div>
  )
}