import React, { useState } from 'react'
import { ITeamMate } from 'src/models/ITeamMate'
import { clsx } from 'src/utils/clsx'
import styles from './TeamMate.scss'

type PropsType = {
  data: ITeamMate
  setDesc: (desc: string) => { return }
}

const TeamMate: React.FC<any> = ({ data, setDesc: setDesc }: PropsType) => {
  return (
    <li className={styles.teamMember} onMouseEnter={() => setDesc(data.description)}>
      <div className={styles.teamMemberImg}>
        <div className={styles.teamMemberImgFrame}>
          <img src={data.image} alt={data.name} />
        </div>
      </div>
      <div className={styles.teamMemberInfo}>
        <div className={styles.teamMemberInfoName}>{data.name}</div>
        <p className={styles.teamMemberInfoRole}>
          {data.role}
          <a
            href={data.github}
            className={clsx({
              [styles.teamMemberInfoRoleLink]: true,
              ['_icon-github']: true,
            })}
          ></a>
        </p>
        <p className={styles.teamMemberInfoStory}>{data.about}</p>
      </div>
    </li>
  )
}

export default TeamMate
