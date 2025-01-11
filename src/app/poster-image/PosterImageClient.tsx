'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function PosterImageClient() {
  const [imageSrc, setImageSrc] = useState('/images/right-poster-200-183.png')
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function updateImage() {
      if (window.innerWidth >= 1258) {
        setImageSrc('/images/right-poster-552-505.png')
        setImageSize({ width: 552, height: 505 })
      } else if (window.innerWidth >= 900) {
        setImageSrc('/images/right-poster-350-320.png')
        setImageSize({ width: 350, height: 320 })
      } else {
        setImageSrc('/images/right-poster-200-183.png')
        setImageSize({ width: 0, height: 0 }) // Hidden below 900px
      }
    }

    updateImage()
    window.addEventListener('resize', updateImage)
    return () => window.removeEventListener('resize', updateImage)
  }, [])

  if (imageSize.width === 0) return null

  return (
    <Image
      src={imageSrc}
      alt="Poster"
      width={imageSize.width}
      height={imageSize.height}
      priority
    />
  )
}