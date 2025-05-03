import styles from './Skills.module.css'
import { getDeveloperFirebase } from '../../Utils/Utils'
import { Logger } from '../../Components/Logger/Logger'

const Skills = () => {
  let developerInfo = getDeveloperFirebase()
  Logger('developerInfo ==== > ', developerInfo)
  let allSkills = developerInfo.allSkills
  return (
    <div className={styles.mainView}>
      <div className={styles.columnView}>
        {allSkills &&
          allSkills.length > 0 &&
          allSkills.map((skillItem: any) => {
            return (
              <div>
                <span className={styles.titleText}>{skillItem.title}</span>
                <div className={styles.rowView}>
                  {skillItem.data &&
                    skillItem.data.length > 0 &&
                    skillItem.data.map((dataItem: any) => {
                      return (
                        <div className={styles.skillsDataView}>
                          <span>{dataItem}</span>
                        </div>
                      )
                    })}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default Skills
