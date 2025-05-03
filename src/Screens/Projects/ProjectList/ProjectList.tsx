import styles from './ProjectList.module.css'
import React, { useEffect, useState } from 'react'
import Images from '../../../res/styles/Images'
import { getDeveloperFirebase, getFormattedText, isMobileDevice } from '../../../Utils/Utils'
import ProjectDetails from '../ProjectDetails/ProjectDetails'

const ProjectList = (props: any) => {
  let developerInfo = getDeveloperFirebase()

  let isMobile = isMobileDevice()
  const projectList = developerInfo.projects
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [hoverIndex, setHoverIndex] = useState(-1)
  const hoverDescriptionLength = isMobile ? 60 : 200

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index)
  }

  const handleMouseLeave = () => {
    setHoverIndex(-1)
  }
  const handleSelectedProject = (project: any) => {
    setSelectedProject(project)
    handleMouseLeave()
  }

  const ProjectItem = ({ item, index }: { item: any, index: number }) => {
    const [imageSrc, setImageSrc] = useState<string>(Images.ic_image_placeholder);

    useEffect(() => {
      const img = new Image();
      img.src = item.projectImage;
      img.onload = () => setImageSrc(item.projectImage);
      img.onerror = () => setImageSrc(Images.ic_image_placeholder);
    }, [item.projectImage]);

    return (
      <div
        onClick={() => handleSelectedProject(item)}
        key={index}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        className={styles.projectItemColumnView}
      >
        <div className={styles.columnView}>
          <div className={styles.rightArrowView}>
            <img
              src={Images.ic_fast_forward}
              className={styles.rightArrowImage}
            />
          </div>

          {hoverIndex == index ? (
            <div className={styles.columnView} id={styles.projectItem}>
              <span className={styles.projectDescription}>
                {getFormattedText(item.projectDescription, hoverDescriptionLength)}
              </span>
              <img
                className={styles.smallProjectLogo}
                src={imageSrc}
              />
            </div>
          ) : (
            <div className={styles.columnView} id={styles.projectItem}>
              {imageSrc === Images.ic_image_placeholder ?
                <div  className={styles.projectImageView}>
                <img
                  className={styles.placeholderLogo}
                  src={imageSrc}
                />
                </div>
                :
                <img
                  className={styles.projectImageView}
                  src={imageSrc}
                />
              }

            <span className={styles.projectTitle}>
              {item.projectName}
            </span>

            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.projectMainView}>
      {!selectedProject ? (
        <>
          <div className={styles.projectItemView}>
            {projectList.map((item: any, index: number) => (
              <ProjectItem item={item} index={index}/>
            ))}
          </div>
        </>
      ) : (
        <ProjectDetails selectedProject={selectedProject} handleSelectedProject={(val)=>handleSelectedProject(val)}/>
      )}
    </div>
  )
};

export default ProjectList
