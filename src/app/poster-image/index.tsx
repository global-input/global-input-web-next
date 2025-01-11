import { PosterImageClient } from './PosterImageClient'

export function PosterImage() {
  return (
    <div className={`absolute top-[20vh] left-[50vw] overflow-hidden hidden 
                    min-[900px]:block min-[900px]:w-[350px] min-[900px]:h-[320px]
                    min-[1258px]:w-[552px] min-[1258px]:h-[505px]`}>
      <PosterImageClient />
    </div>
  )
}