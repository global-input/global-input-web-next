'use client'

import { useEffect, useState } from "react"

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export const useCanonicalLink = (url: string) => {
  useEffect(() => {
    if (!url) return

    let existingTag = document.querySelector('link[rel="canonical"]')
    if (!existingTag) {
      const linkTag = document.createElement("link")
      linkTag.rel = "canonical"
      linkTag.href = url
      document.head.appendChild(linkTag)
    } else {
      existingTag.setAttribute("href", url)
    }

    return () => {
      if (existingTag) {
        document.head.removeChild(existingTag)
      }
    }
  }, [url])
}

export const useCanonicalPage = (defaultUrl: string) => {
  const [canonicalPage, setCanonicalPage] = useState(false)

  useEffect(() => {
    if (
      window.location.search ||
      (window.location.pathname &&
        window.location.pathname !== "/" &&
        window.location.pathname !== "/index.html")
    ) {
      setCanonicalPage(true)
    }

    if (window.location) {
      const { protocol, hostname } = window.location
      if (protocol === "https:" && hostname === "globalinput.co.uk") {
        return
      }
      console.log("Canonical page is set to true")
      setCanonicalPage(true)
    }
  }, [])

  useCanonicalLink(canonicalPage ? defaultUrl : "")

  return canonicalPage
}