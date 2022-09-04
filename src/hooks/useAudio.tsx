import React, { useEffect, useState } from 'react'

export const useAudio = (url) => {
  const [audio, setAudio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying(!playing)
  useEffect(() => {
    setAudio(new Audio(url))
  }, [url])
  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [toggle])

  return [playing, toggle] as const
}
