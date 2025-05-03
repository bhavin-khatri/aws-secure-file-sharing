import React, { useEffect, useState } from 'react'
import styles from './Timeline.module.css';
import Images from '../res/styles/Images'
import { getFormattedText, isMobileDevice } from '../Utils/Utils'
import { Logger } from './Logger/Logger'

interface IProps {
  experiences: Array<any>;
  selectedItem:any
  onItemClick:(item:any)=>void
  totalExperience?:string
}

interface Experience {
  companyName: string;
  duration: string;
  endDate:string;
  startDate:string;
  companyLogo: string;
  companyLinkedInProfile:string
}

export const TimeLine = (props: IProps) => {
  const { experiences ,selectedItem,onItemClick , totalExperience } = props;

  const ExperienceItem = ({ experience, index }: { experience: Experience, index: number }) => {
    const [imageSrc, setImageSrc] = useState<string>(Images.ic_image_placeholder);
    const isMobile = isMobileDevice()
    let formattedCompanyName = isMobile ? getFormattedText(experience.companyName,8) : experience.companyName
    // Logger("experience ======= > ",experience)
    Logger("experience startDate======= > ",experience.startDate)
    useEffect(() => {
      const img = new Image();
      img.src = experience.companyLogo;
      img.onload = () => setImageSrc(experience.companyLogo);
      img.onerror = () => setImageSrc(Images.ic_image_placeholder);
    }, [experience.companyLogo]);

    const handleClickCompanyName=(url:string)=>{
      window.open(url)
    }


    return (
      <div
        key={index}
        onClick={()=>onItemClick(experience)}
        className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right} ${selectedItem.companyName == experience.companyName ? styles.active : styles.inactive}`}
      >
        <div  className={`${styles.content} ${index % 2 === 0 ? styles.left : styles.right}`}>
          <span className={styles.companyNameText} onClick={()=>handleClickCompanyName(experience.companyLinkedInProfile)}>{formattedCompanyName}</span>
          <span className={styles.durationText}>{experience.startDate} - {experience.endDate}</span>
        </div>
        <div className={`${styles.boxItem} ${index % 2 === 0 ? styles.left : styles.right}`}>
          {imageSrc === Images.ic_image_placeholder ?
            <img
              src={imageSrc}
              alt={`${experience.companyName} logo`}
              className={styles.placeHolderLogo}
            />
            :<img
              src={imageSrc}
              alt={`${experience.companyName} logo`}
              className={styles.logo}
            />
          }

        </div>
        <div className={styles.smallLine}/>
      </div>
    );
  };
  return (
    <div className={styles.timelineContainer}>
      <div className={`${styles.timelineTop}`}/>
      <div className={styles.timeline}/>
      <div className={`${styles.timelineBottom}`}/>
      <div className={styles.experience}>
        {experiences.map((experience, index) => (
          <ExperienceItem experience={experience} index={index}/>
        ))}
      </div>
    </div>
  );
};
