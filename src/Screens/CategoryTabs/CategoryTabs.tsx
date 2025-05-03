import React, { useState } from 'react'
import styles from './CategoryTabs.module.css'
import ProjectList from '../Projects/ProjectList/ProjectList'
import Resume from '../Resume/Resume'
import { getDeveloperFirebase } from '../../Utils/Utils'
import AboutMe from '../AboutMe/AboutMe'
import Experience from '../Experience/Experience'
import Skills from '../Skills/Skills'
// import * as developerInfo from "../../../ProjectData.json"

const CategoryTabs = () => {
  // let  developerInfo = require("../../ProjectData.json")
  let developerInfo = getDeveloperFirebase()
  const categories = developerInfo.categories
  const [activeCategory, setActiveCategory] = useState(categories[0])
  let developerName =
    developerInfo && developerInfo.personalDetails
      ? `${developerInfo.personalDetails.firstName} ${developerInfo.personalDetails.lastName}`
      : ''
  const handleCategoryClick = (category: any) => {
    setActiveCategory(category)
  }

  const componentMap: any = {
    About: AboutMe,
    ProjectList: ProjectList,
    Resume: Resume,
    Experience: Experience,
    Skills: Skills,
  }

  const ActiveComponent: any = componentMap[activeCategory.componentName]

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.nameView}>
          <span className={styles.nameText}>{`<`}</span>
          <span id={styles.devName} className={styles.nameText}>
            {`${developerName} `}{' '}
          </span>
          <span className={styles.nameText}>{`/>`}</span>
        </div>
        <div className={styles.categoryRowView}>
          {categories.map((category: any, index: number) => (
            <div
              className={styles.categoryItemView}
              key={index}
              onClick={() => handleCategoryClick(category)}
            >
              <div className={styles.categoryTitleBg}>
                <span
                  className={styles.categoryTitle}
                  id={
                    activeCategory.title === category.title
                      ? styles.activeTitle
                      : styles.inActiveTitle
                  }
                >
                  {category.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.body}>
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  )
}

export default CategoryTabs
