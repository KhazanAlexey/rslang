import React, { useEffect, useState } from 'react'
import styles from './TextbookPage.module.scss'
import Words from '../words/Words'
import Detail from './detail/Detail'

const TextBookPage: React.FC<any> = () => {
  return (
    <div>
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
        <h1>Учебник</h1>
        <Words />
      </section>
      <section></section>
    </div>
  )
}

export default TextBookPage
