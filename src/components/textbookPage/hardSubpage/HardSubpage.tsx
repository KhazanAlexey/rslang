import React, { useState } from 'react'
import Words from 'src/components/words/Words'
import Detail from '../detail/Detail'
import styles from './HardSubpage.module.scss'

const HardSubpage: React.FC<any> = (props) => {
  const { hardWords, setHardWords } = props;
  const [ wordDetail, setWordDetail ] = useState('');


  return (
    <section className=''>
      <section>
        <div className={globalThis.globalStyles.container}>
          <h2 className={globalThis.globalStyles.sectionTitle}>Сложные слова</h2>
          
        </div>  
      </section>
      <section className=''>  
        <div className={globalThis.globalStyles.container}>
          
          <Detail 
              id={wordDetail}
              complete={false}
              hard={false}
              hardWords={hardWords}
              setHardWords={setHardWords} />
        </div>
        {/* <Words />*/}
      </section>
    </section>
  )
}

export default HardSubpage