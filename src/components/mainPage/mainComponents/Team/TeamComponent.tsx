import React, { useState } from 'react'
import styles from './TeamComponent.scss'
import { clsx } from '../../../../utils/clsx'
import teamJson from '../../../../data/team.json'
import TeamMate from './TeamMate/TeamMate'
import { ITeamMate } from 'src/models/ITeamMate'

const TeamComponent: React.FC<any> = () => {
  const teamData = JSON.parse(JSON.stringify(teamJson)) as ITeamMate[]
  const [desc, setDesc] = useState(teamData[0].description)

  return (
    <section className={styles.teamSection}>
      <div className={globalThis.globalStyles.container}>
        <h2 className={styles.teamSectionHeader}>Команда разработчиков Enggo.</h2>
        <div className={clsx({ [styles.teamSectionWrapper]: true })}>
          <div className={styles.teamSectionList}>
            {teamData.map((member: ITeamMate) => (
              <TeamMate data={member} key={member.id} setDesc={setDesc} />
            ))}
          </div>
          <div className={styles.teamSectionDecoration}>
            <div className={styles.teamSectionDecorationEnggo}>
              <img src='./assets/svg/enggo-smart.svg' alt='Enggo Smart' />
            </div>
            <div className={styles.teamSectionDecorationCloud}>
              <p>{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamComponent
