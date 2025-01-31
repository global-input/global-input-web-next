// src/app/page.tsx
import { config } from "@/lib/web-config";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import { PosterImage } from "./poster-image";
import { HowItWorks } from "./how-it-works";
import { CardSection } from "./card-section";
import { HomePageClient } from "./HomePageClient";
import { TopContainer } from "@/components/containers";

const headerTextContent = {
  title: "Mobile Integration Framework",
  subtitle:
    "Enable secure mobile capabilities in your applications with minimal code changes. Features encrypted QR authentication, dynamic mobile UI generation, and secure data exchange - perfect for streaming services, self-service systems, and IoT applications.",
};

export const metadata = {
  title:
    "Global Input App - Introducing Mobile Interoperability into Web and Device Applications",
  alternates: {
    canonical: "https://globalinput.co.uk/",
  },
};

export default function HomePage() {
  return (
    <TopContainer>
      <PageHeader selected={config.paths.home.path} />
      <div className="w-full flex flex-col justify-start items-start flex-1">
        <PosterImage />
        <div className="flex flex-col justify-center text-white h-[90vh] ml-[20vw] whitespace-pre-wrap">
          <div
            className="text-[65px] font-black pb-[30px] leading-[65px] w-[25vw]
                       max-[1258px]:text-[40px] max-[1258px]:leading-[40px]
                       max-[900px]:w-[50vw]"
          >
            {headerTextContent.title}
          </div>
          <div
            className="text-xl pb-[3px] leading-7 w-[25vw] text-[#fffe]
                       max-[900px]:w-[50vw]"
          >
            {headerTextContent.subtitle}
          </div>
          <HomePageClient />
        </div>
        <CardSection />
        <HowItWorks />
      </div>
      <PageFooter />
    </TopContainer>
  );
}
