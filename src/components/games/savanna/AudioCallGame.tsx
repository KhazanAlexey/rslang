import React, { useEffect, useState } from 'react'
import { wordsAPI } from '../../../services/WordsService'
import randomInteger from '../../../utils/random'

const AudioCallGame: React.FC<any> = ({ level }) => {
  const [page, setPage] = useState(0)
  const {
    data: words,
    isLoading: isLoadingWords,
    error: errorWords,
    refetch,
  } = wordsAPI.useFetchWordsQuery({ group: level, page: page })

  useEffect(() => {
    setPage(randomInteger(0, 21))
  }, [])

  return <>{words && words.map((word) => <div>{word.word}</div>)}</>
}

export default AudioCallGame
