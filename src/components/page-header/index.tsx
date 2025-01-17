'use client'

import React, { useState, useEffect, useRef } from "react"
import Link from 'next/link'
import Image from 'next/image'
import { config } from "@/lib/web-config"

interface Props {
  selected?: string | null;
}

const appTitle =  "Global Input App";

export function PageHeader({ selected }: Props) {
  const [menuPressed, setMenuPressed] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuPressed(false)
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
  
    if (menuPressed) {
      timer = setTimeout(() => {
        document.addEventListener("click", handleClickOutside)
      }, 0)
    } else {
      document.removeEventListener("click", handleClickOutside)
    }
  
    return () => {
      clearTimeout(timer)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [menuPressed])

  const toggleMenu = () => {
    setMenuPressed((prev) => !prev)
  }

  const menus = [
    { link: config.paths.home.path, linkText: "HOME" },
    { link: config.paths.privacy.path, linkText: "PRIVACY POLICY" },
    { link: config.paths.contactUs.path, linkText: "CONTACT US" },
    { link: config.paths.getAppScreen.path, linkText: "GET IT FREE" },
  ]

  return (
    <div className="flex flex-col w-full bg-white print:hidden">
      <div className="w-full flex flex-row justify-between items-center text-sm z-50">
        {/* Logo Section */}
        <div className="flex flex-row items-center ml-[5vw] space-x-2.5">
          <a href="https://iterativesolution.co.uk" className="flex flex-row no-underline items-center">
            <Image
              src="/images/company-icon.png"
              alt="Company Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <h3 className="text-[#5291cd] whitespace-nowrap font-light pl-2.5 text-xs sm:text-sm md:text-base lg:text-xl">
              Iterative Solution
            </h3>
          </a>
          
          <div className="border-l h-[50px]" />
          
          <Link href="/" className="flex flex-row no-underline items-center">
            <Image
              src="/images/small-app-icon.png"
              alt="App Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <h3 className="text-[#5291cd] whitespace-nowrap font-light pl-2.5 text-xs sm:text-sm md:text-base lg:text-xl">
              {appTitle}
            </h3>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-row mr-[5vw] xl:mr-[15vw] items-center">
          {menus.map((menu, index) => (
            <Link
              href={menu.link}
              key={`${index}_${menu.link}_${menu.linkText}`}
              className="text-[#5291cd] no-underline ml-[30px] hover:text-[#74b3fe]"
            >
              {menu.linkText}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden mr-[5vw] font-normal text-[#5291cd] border-none bg-white focus:outline-none focus:shadow-[0_0_50px_#ffff]"
          aria-expanded={menuPressed}
        >
          <Image
            src={menuPressed ? "/images/close.png" : "/images/menu-symbol.svg"}
            alt={menuPressed ? "Close Menu" : "Open Menu"}
            width={22}
            height={20}
            className="block"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuPressed && (
        <div 
          ref={menuRef}
          className="flex flex-col absolute z-40 bg-white top-[54px] right-0 w-full lg:hidden animate-[slideIn_300ms_ease-out]"
        >
          {menus.map((menu, index) => (
            <Link
              href={menu.link}
              key={`mobile_${index}_${menu.link}_${menu.linkText}`}
              className="bg-white no-underline text-[#5291cd] text-left whitespace-nowrap text-sm flex flex-col p-5 items-start w-full border-b border-[#5291cd] hover:text-[#74b3fe]"
            >
              {menu.linkText}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}