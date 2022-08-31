import React from 'react'
import Words from 'src/components/words/Words'
import Detail from '../detail/Detail'
import styles from './CompleteSubpage.module.scss'

const CompleteSubpage: React.FC<any> = () => {
  return (
    <section className=''>
      <section>
        <div className={globalThis.globalStyles.container}>
          <h2 className={globalThis.globalStyles.sectionTitle}>Изученные слова</h2>
          
        </div>  
      </section>
      <section className=''>  
        <div className={globalThis.globalStyles.container}>
          <Detail 
              wordEn='reusable' 
              wordRu='многоразового использования'
              transcription='[riúzəbl]'
              image=''
              sound=''
              valueEn='An object that is reusable can be utilized over and over again.'
              valueRu='Объект, который можно использовать повторно, можно использовать снова и снова'
              exampleEn='Saburo keeps his empty jelly jars because they are reusable for storing sewing supplies.'
              exampleRu='Сабуро хранит свои пустые желейные банки, потому что их можно использовать для хранения швейных принадлежностей'
              complete={false}
              hard={false} />
        </div>
        <Words />
      </section>
    </section>
  )
}

export default CompleteSubpage