import styles from './AboutMe.module.css'
import Lottie from 'lottie-react-web'
import Animations from '../../res/styles/Animations'
import { countTotalExperience, getDeveloperFirebase, isMobileDevice } from '../../Utils/Utils'
import Images from '../../res/styles/Images'
import React, { useEffect, useState } from 'react'
// import ProjectData from "../../../src/ProjectData.json"
import { Logger } from '../../Components/Logger/Logger'

const AboutMe = () => {
  const isMobile = isMobileDevice()
  const developerInfo = getDeveloperFirebase()
  let aboutMe =
    (developerInfo &&
      developerInfo.personalDetails &&
      developerInfo.personalDetails.aboutMe) ||
    ''
  const firstName = developerInfo.personalDetails.firstName
  const lastName = developerInfo.personalDetails.lastName
  const pdfUrl = developerInfo.resumeData.resumePdf
  const [briefAboutMe,setBriefAboutMe] = useState<string>(aboutMe)
  function navigateToMail() {
    const emailId = developerInfo.personalDetails.contactEmail
    const mailtoUrl = `mailto:${emailId}`
    window.open(mailtoUrl)
  }
  function downloadPdf() {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${firstName}_${lastName}.pdf`
    link.target = '_blank' // Open in new tab
    link.click()
  }

  const SocialItem = ({ item, index }: { item: any, index: number }) => {
    const [imageSrc, setImageSrc] = useState<string>(Images.ic_image_placeholder);

    useEffect(() => {
      const img = new Image();
      img.src = item.image;
      img.onload = () => setImageSrc(item.image);
      img.onerror = () => setImageSrc(Images.ic_image_placeholder);
    }, [item.image]);

    useEffect(()=>{
      if(developerInfo && developerInfo.resumeData && developerInfo.resumeData && developerInfo.resumeData.experiences && developerInfo.resumeData.experiences.length >0){
        let experiencesArray = developerInfo.resumeData.experiences;
        experiencesArray.sort((a:any,b:any)=> new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        let startDate = experiencesArray[0].startDate;
        let endDate = experiencesArray[experiencesArray.length -1].endDate;
        let totalExperience = countTotalExperience(startDate,endDate)
        aboutMe = aboutMe.replace('{years_of_exp}',totalExperience)
        setBriefAboutMe(aboutMe)
      }
    },[developerInfo])

    return (
      <div className={styles.socialItemMainView}>
        <a
          href={item?.value}
          target="_blank"
          rel="noopener noreferrer"
        >
          {imageSrc === Images.ic_image_placeholder ?

            <div className={styles.placeholderView}>
            <img
              className={styles.placeholderLogo}
              src={imageSrc}
              alt={`${item.value} logo`}
            />
            </div>
            :<img
              className={styles.socialItemImage}
              src={imageSrc}
              alt={`${item.value} logo`}
            />
          }

        </a>
      </div>
    );
  };
  return (
    <div className={styles.mainView}>
      <div className={styles.rowView}>
        <div className={styles.aboutMeView}>
          <span className={styles.titleText}>Hi all 👋 I'm {firstName}</span>
          <span className={styles.descriptionText}>{briefAboutMe}</span>
          <div className={styles.socialRowView}>
            {developerInfo &&
              developerInfo.social &&
              developerInfo.social.length > 0 &&
              developerInfo?.social.map((item: any,index:number) => (
                <SocialItem item={item} index={index}/>
              ))}
          </div>
          <div className={styles.socialRowView}>
            <div className={styles.buttonView} onClick={navigateToMail}>
              <div className={styles.buttonTextView}>
                <span className={styles.buttonText}>CONTACT ME</span>
              </div>
              <div className={styles.buttonIcon}>
                <img src={Images.ic_email} className={styles.downloadIcon} />
              </div>
            </div>
            <div className={styles.buttonView} onClick={downloadPdf}>
              <div className={styles.buttonTextView}>
                <span className={styles.buttonText}>DOWNLOAD CV</span>
              </div>
              <div className={styles.buttonIcon}>
                <img src={Images.ic_download} className={styles.downloadIcon} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.lottieContainer}>
            <Lottie
              options={{
                animationData: Animations.an_coder,
                loop: true,
                autoplay: true,
              }}
              width={!isMobile ? 700 : 400}
              height={!isMobile ? 500 : 250}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default AboutMe
