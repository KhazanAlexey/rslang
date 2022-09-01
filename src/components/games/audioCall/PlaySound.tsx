import React from 'react'
import { useAudio } from 'src/hooks/useAudio'

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url)

  return (
    <div>
      <button onClick={() => toggle()}>{playing ? 'Pause' : 'Play'}</button>
    </div>
  )
}

export default Player
