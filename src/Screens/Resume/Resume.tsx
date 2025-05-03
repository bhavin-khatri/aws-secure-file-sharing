import styles from './Resume.module.css'
import { getDeveloperFirebase, isEmpty } from '../../Utils/Utils'

const Resume = (props: any) => {
  let developerInfo: any = getDeveloperFirebase()
  const resumeDetails = developerInfo.resumeData
  const projectList = developerInfo.projects
  const socialList = developerInfo.social
  const userInfo = developerInfo.personalDetails
  const workExperience = resumeDetails.experiences
  const education = resumeDetails.education
  const skills = resumeDetails.skills
  const languages = resumeDetails.languages
  return (
    <div className={styles.resumeMainView}>
      <div className={styles.resumeRowView}>
        <div className={styles.resumeColumnView}>
          <span className={styles.resumeNameText}>
            {userInfo.firstName} {userInfo.lastName}
          </span>
          <span className={styles.resumeTextSize18}>{userInfo.address}</span>
          <span className={styles.resumeTextSize18}>
            {userInfo.contactNumber}
          </span>
          <span className={styles.resumeTextSize18}>
            {userInfo.contactEmail}
          </span>
        </div>
        <img
          src={resumeDetails.image}
          className={styles.resumeProfileImage}
          alt="Resume"
        />
      </div>
      <div className={styles.resumeMarginView} />
      {workExperience && workExperience.length > 0 && (
        <div>
          <span className={styles.resumeNameText}>Experience</span>
          <div className={styles.resumeVerticalLineView} />
          {workExperience.map((workItem: any, workIndex: number) => (
            <div className={styles.resumeColumnView}>
              <div className={styles.resumeRowView}>
                <span className={styles.resumeNameText}>
                  {workItem.companyName}
                </span>
                <span className={styles.resumeTextSize18}>
                  {workItem.startDate} - {workItem.endDate}
                </span>
              </div>

              <span className={styles.resumeTextSize18}>
                {workItem.designation}
              </span>
              <div className={styles.resumeMarginView} />
              <div>
                {workItem.roleDescription.length > 0 ? (
                  <div>
                    <span className={styles.resumeTextSize18}>
                      <b>Responsibilities</b>
                    </span>
                    <div>
                      {workItem.roleDescription.map(
                        (roleItem: any, roleIndex: number) => {
                          const roleNumber = `${roleIndex + 1}.`
                          return (
                            <div
                              className={styles.resumeColumnView}
                              key={`${workIndex}-${roleIndex}`}
                            >
                              <span className={styles.resumeTextSize18}>
                                {roleNumber} {roleItem}
                              </span>
                            </div>
                          )
                        },
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className={styles.resumeMarginView} />
              <div>
                {workItem.achievements.length > 0 ? (
                  <div>
                    <span className={styles.resumeTextSize18}>
                      <b>Achievements</b>
                    </span>
                    <div>
                      {workItem.achievements.map(
                        (achievementItem: any, achievementIndex: number) => {
                          const achievementNumber = `${achievementIndex + 1}.`
                          return (
                            <div
                              className={styles.resumeColumnView}
                              key={`${workIndex}-${achievementIndex}`}
                            >
                              <span
                                className={styles.resumeTextSize18}
                                id={styles.achievementTexts}
                              >
                                {achievementNumber} {achievementItem}
                              </span>
                            </div>
                          )
                        },
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={styles.resumeMarginView} />
      {education && education.length > 0 && (
        <div>
          <span className={styles.resumeNameText}>Education</span>
          <div className={styles.resumeVerticalLineView} />
          {education.map((educationItem: any) => (
            <div className={styles.resumeColumnView}>
              <div className={styles.resumeRowView}>
                <span className={styles.resumeNameText}>
                  {educationItem.university}
                </span>
                <span className={styles.resumeTextSize18}>
                  {educationItem.startYear} - {educationItem.endYear}
                </span>
              </div>
              <span className={styles.resumeTextSize18}>
                {educationItem.course}
              </span>
              <span className={styles.resumeTextSize18}>
                CGPA - {educationItem.cgpa}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className={styles.resumeMarginView} />

      {skills && skills.length > 0 && (
        <div>
          <span className={styles.resumeNameText}>Skills</span>
          <div className={styles.resumeVerticalLineView} />
          <div className={styles.skillsMainView}>
            {skills.map((skill: any, index: number) => (
              <div className={styles.skillsChild}>
                <div
                  className={styles.resumeRowView}
                  key={index}
                  id={styles.skillsRowView}
                >
                  <div className={styles.skillsCircleView} />
                  <span
                    className={styles.resumeTextSize18}
                    key={skill}
                    id={styles.skillItem}
                  >
                    {skill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={styles.resumeMarginView} />
      {projectList && projectList.length > 0 && (
        <div>
          <span className={styles.resumeNameText}>Projects</span>
          <div className={styles.resumeVerticalLineView} />
          <div className={styles.skillsMainView}>
            {projectList.map((project: any, index: number) => (
              <div className={styles.resumeColumnView}>
                <span className={styles.resumeTextSize18} key={project.title}>
                  <b>{project.projectName}</b>
                </span>
                <span
                  className={styles.resumeTextSize18}
                  key={project.roleDescription}
                >
                  {project.roleDescription}
                </span>
                <div className={styles.resumeRowView} id={styles.skillsRowView}>
                  <span className={styles.resumeTextSize18} key={project.title}>
                    <b>Project Portfolio :- </b>
                  </span>
                  <a
                    id={styles.projectSourceCode}
                    href={project?.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className={styles.resumeTextSize18}
                      key={project.title}
                      id={styles.projectSourceCode}
                    >
                      {project.projectLink}
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.resumeMarginView} />
      {languages && languages.length > 0 && (
        <div>
          <span className={styles.resumeNameText}>Languages</span>
          <div className={styles.resumeVerticalLineView} />
          <div className={styles.resumeColumnView}>
            {languages.map((language: any, index: number) => (
              <div className={styles.resumeColumnView}>
                <span className={styles.resumeTextSize18} key={language}>
                  {language}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={styles.resumeMarginView} />
      {socialList && socialList.length > 0 && (
        <div>
          <span className={styles.resumeNameText}>Social</span>
          <div className={styles.resumeVerticalLineView} />
          <div className={styles.resumeColumnView}>
            {socialList.map((social: any, index: number) => (
              <div className={styles.resumeColumnView}>
                <div className={styles.resumeRowView} id={styles.skillsRowView}>
                  <span className={styles.resumeTextSize18} key={social.title}>
                    {social.title}
                  </span>
                  <a
                    id={styles.projectSourceCode}
                    href={social?.value}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className={styles.resumeTextSize18}
                      key={social.title}
                      id={styles.projectSourceCode}
                    >
                      {social.value}
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.resumeMarginView} />
      {!isEmpty(resumeDetails.declaration) && (
        <div>
          <span className={styles.resumeNameText}>Declaration</span>
          <div className={styles.resumeVerticalLineView} />
          <span
            className={styles.resumeTextSize18}
            key={resumeDetails.declaration}
          >
            {resumeDetails.declaration}
          </span>
        </div>
      )}
    </div>
  )
}

export default Resume
