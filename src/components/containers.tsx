// src/components/SharedContainer.tsx
import React from "react";
import { PageHeader } from '@/components/page-header'
interface TopContainerProps {
  children: React.ReactNode;
}

export function TopContainer({ children }: TopContainerProps) {
  return (
    <div
      className="flex flex-col justify-start items-center w-full min-h-screen bg-[#72a4d2] 
                 min-[880px]:bg-white min-[880px]:bg-[url('/images/headerBackground-1440.svg')]
                 min-[880px]:bg-no-repeat min-[880px]:bg-cover"
    >
      {children}
    </div>
  );
}

interface ApplicationTopContainerProps {
  children: React.ReactNode;
}
export  function ApplicationTopContainer({ children }: ApplicationTopContainerProps) {
  return (
    <TopContainer>
      <PageHeader />
      <div className="p-12">
        {children}
      </div>
    </TopContainer>
  )
}
