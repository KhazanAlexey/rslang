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
        <h2 className={styles.teamSectionHeader}>#DREAMTEAM</h2>
        <h3 className={styles.teamSectionSubtitle}>Команда мечты, созданная в <a href='https://rs.school/'>RS School</a>.</h3>
        <div className={styles.teamSectionWrapper}>
          <ul className={styles.teamSectionList}>
            {teamData.map((member: ITeamMate) => (
              <TeamMate data={member} key={member.id} setDesc={setDesc} />
            ))}
          </ul>
          <div className={styles.teamSectionDecoration}>
            <div className={styles.teamSectionDecorationEnggo}>
              <img src='./assets/svg/enggo-smart.svg' alt='Enggo Smart' />
            </div>
            <div className={styles.teamSectionDecorationCloud}>
              <p>{desc}</p>
              <span className='_icon-arrow'></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamComponent
