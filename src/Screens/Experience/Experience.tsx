import styles from './Experience.module.css'
import { countExperience, countTotalExperience, getDeveloperFirebase } from '../../Utils/Utils'
import { TimeLine } from '../../Components/TimeLine'
import { useEffect, useState } from 'react'

const Experience = () => {
  let developerInfo = getDeveloperFirebase()
  let resumeData = developerInfo && developerInfo.resumeData
  let experiences = resumeData && resumeData.experiences ? resumeData.experiences : []
  const [selectedItem, setSelectedItem] = useState<any | null>(resumeData.experiences[0]);
  const [experienceInCompany,setExperienceInCompany] =useState<string>('')
  const [totalExperience,setTotalExperience] =useState<string>('')
  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  useEffect(()=>{
    if(selectedItem){
      let exp = countExperience(selectedItem.startDate,selectedItem.endDate)
      setExperienceInCompany(exp)
    }
  },[selectedItem])



  useEffect(()=>{
    if(experiences && experiences.length >0){
      let startDate = experiences[experiences.length -1].startDate;
      let endDate = experiences[0].endDate;
      let totalExperience = countTotalExperience(startDate,endDate)
      setTotalExperience(totalExperience)
    }
  },[developerInfo])

  const handleClickCompanyName=()=>{
    window.open(selectedItem.companyLinkedInProfile)
  }


  return (
    <div className={styles.mainView}>
      <TimeLine totalExperience={totalExperience} experiences={experiences} selectedItem={selectedItem} onItemClick={(item:any)=>handleItemClick(item)}/>

        <div className={styles.selectedView}>
          <div className={styles.columnView}>
            <div className={styles.rowView}>
              <span className={styles.companyNameText} onClick={handleClickCompanyName}>
                {selectedItem.companyName}
              </span>
              <div className={styles.columnView}>
              <span className={styles.dateText}>
                {selectedItem.startDate} - {selectedItem.endDate}
              </span>
                <span className={styles.dateText} id={styles.companyExpInYears}>
                {`(${experienceInCompany})`}
              </span>
              </div>
            </div>
            <span className={styles.designationText}>
              {selectedItem.designation} - {selectedItem.employmentType}
            </span>
            {selectedItem.role ?
              <span className={styles.experienceBodyText} id={styles.roleText}>
              Role - {selectedItem.role}
            </span>
              :null
            }

            {selectedItem.roleDescription && selectedItem.roleDescription.length > 0 ?
              <div className={styles.columnView}>
              <span className={styles.experienceBodyTitle}>
                Responsibilities
              </span>
                {selectedItem.roleDescription.map((roleItem: any, roleIndex: any) => (
                  <span className={styles.experienceBodyText}>• {roleItem}</span>
                ))}
              </div>
              :null
            }

            {selectedItem.achievements && selectedItem.achievements.length > 0 ?
              <div className={styles.columnView}>
                <span className={styles.experienceBodyTitle}>Achievements</span>
                {selectedItem.achievements.map((roleItem: any, roleIndex: any) => (
                  <span className={styles.experienceBodyText}>• {roleItem}</span>
                ))}
              </div>
              :null
            }

            <div className={styles.columnView}>
              <span className={styles.experienceBodyTitle}>Skills</span>
              <div className={styles.skillsRowView}>
                {selectedItem.skills.map((item: any) => (
                  <div className={styles.skillsStackItemView}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Experience
