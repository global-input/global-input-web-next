'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function PosterImage() {
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

  return (
    <div className={`absolute top-[20vh] left-[50vw] overflow-hidden hidden 
                    min-[900px]:block min-[900px]:w-[350px] min-[900px]:h-[320px]
                    min-[1258px]:w-[552px] min-[1258px]:h-[505px]`}>
      {imageSize.width > 0 && (
        <Image
          src={imageSrc}
          alt="Poster"
          width={imageSize.width}
          height={imageSize.height}
          priority
        />
      )}
    </div>
  )
}