import React from 'react'
import { useAudio } from 'src/hooks/useAudio'
import { clsx } from 'src/utils/clsx'

type PlayerProps = {
  url:string
}

const Player = ({ url }:PlayerProps) => {
  const [playing, toggle] = useAudio(url)

  return (
    <div>
      <button onClick={() => toggle()}>
        <span 
          className={
            clsx({
              ['_icon-sound']: !playing,
              ['_icon-arrow']: playing,
            })}
        ></span>
      </button>
    </div>
  )
}

export default Player
