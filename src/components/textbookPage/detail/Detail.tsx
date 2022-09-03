import React, { useEffect, useState } from 'react'
import { wordsAPI } from 'src/services/WordsService';
import { clsx } from 'src/utils/clsx';
import styles from './Detail.module.scss'
import { IWord } from '../../../models/IWord'

const Detail: React.FC<any> = (props) => {
  const { id, hardWords, setHardWords } = props;
  const {
    data: wordData,
    isLoading: isLoadingWordData,
    error: errorWordData,
    refetch
  } = wordsAPI.useFetchWordByIdQuery(id);
  console.log(wordData);
  const { complete, hard } = props;

  // TODO: сделать логику добавления в сложные
  const [isHard, setIsHard] = useState(hard);
  const hardHandler = () => {
    // if (isHard === true) setIsHard(false)
    // else setIsHard(true)
    if (isHard === true) {
      setIsHard(false);
      setHardWords(hardWords.filter((word) => word.id !== id));
    } else {
      setIsHard(true);
      const newHardWord = {
        id: id,
        word: wordData ? wordData.word : '',
        wordTranslate: wordData ? wordData.wordTranslate : ''
      };
      setHardWords([...hardWords, newHardWord]);
    }
  }
  // TODO: сделать логику добавления в изученные
  const [isComplete, setIsComplete] = useState(complete);
  const completeHandler = () => {
    if (isComplete === true) setIsComplete(false)
    else setIsComplete(true)
  }
  // TODO: сделать управление озвучкой слова
  const [soundOn, setSoundOn] = useState(false);
  const soundHandler = () => {
    if (soundOn === true) setSoundOn(false)
    else setSoundOn(true)
  }

  return (
    <article className={clsx({
      [styles.detail]: true,
      [styles.detailComplete]: isComplete,
      [styles.detailHard]: isHard
    })}>
      <div className={styles.detailMain}>
        <h3 className={styles.detailTitle}>{wordData && wordData.word}</h3>
        <button className={clsx({
          [styles.detailSound]: true,
          ['_icon-sound']: true,
          [styles.soundOn]: soundOn
        })} onClick={soundHandler}></button>
        {wordData && <audio src={`https://rs-lang-193.herokuapp.com/${wordData.audio}`}></audio>}        
        <span className={styles.detailTranscription}>{wordData && wordData.transcription}</span>
        <p className={styles.detailTranslate}>{wordData && wordData.wordTranslate}</p>
        <hr className={styles.detailLine} />
      </div>
      <div className={styles.detailMore}>
        <ul className={styles.detailList}>
          <li className={styles.detailItem}>
            <h4 className={styles.detailSubtitle}>Значение слова</h4>
            {wordData && <p className={styles.detailText} dangerouslySetInnerHTML={{__html: wordData.textMeaning}}></p>}
            <p className={styles.detailText}>{wordData && wordData.textMeaningTranslate}</p>
          </li>
          <li className={styles.detailItem}>
            <h4 className={styles.detailSubtitle}>Пример использования</h4>
            {wordData && <p className={styles.detailText} dangerouslySetInnerHTML={{__html: wordData.textExample}}></p>}
            <p className={styles.detailText}>{wordData && wordData.textExampleTranslate}</p>
          </li>
        </ul>
      </div>
      <div className={styles.detailImage}>
        <img src={wordData && `https://rs-lang-193.herokuapp.com/${wordData.image}`} alt={wordData && wordData.word} />
      </div>
      <div className={styles.detailControl}>
        <button className={clsx({
          [styles.controlBtn]: true,
          [styles.controlHard]: true,
          ['_icon-bookmark']: true
        })} onClick={hardHandler}>
          <span>Сложное</span>
        </button>
        <button className={clsx({
          [styles.controlBtn]: true,
          [styles.controlComplete]: true,
          ['_icon-star']: true
        })} onClick={completeHandler}>
          <span>Изучено</span>
        </button>
      </div>
    </article>
  )
}

export default Detail