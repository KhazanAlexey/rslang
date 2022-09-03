import React, { useState } from 'react'
import { ITeamMate } from 'src/models/ITeamMate'
import { clsx } from 'src/utils/clsx'
import styles from './TeamMate.scss'

type PropsType = {
  data: ITeamMate
  setDesc: (desc:string) => { return } 
}

const TeamMate: React.FC<any> = ({data, setDesc: setDesc}: PropsType) => {

  return (
    <div className={styles.teamMember} onMouseEnter={() => setDesc(data.description)}> 
      <div className={styles.teamMemberImg}>
        <div className={styles.teamMemberImgFrame}>
          <img src={data.image} alt={data.name} /> 
        </div>
      </div>
      <div className={styles.teamMemberInfo}>
        <div className={styles.teamMemberInfoName}>
          {data.name}
        </div>
        <div className={styles.teamMemberInfoRole}>
          {data.role}
          <a href={data.github} className={clsx({
            [styles.teamMemberInfoRoleLink]: true,
            ['_icon-github']: true
          })}></a>
        </div>
        <p className={styles.teamMemberInfoStory}>
          {data.about}
        </p>
      </div>
    </div>
  )
}

export default TeamMate

