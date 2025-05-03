import styles from './ProjectDetails.module.css'
import React, { useEffect, useState } from 'react'
import Images from '../../../res/styles/Images'
import { QRCode } from 'react-qrcode-logo'
import { ImageGallery } from '../../../Components/ImageGallary/ImageGallery'

interface IProps{
  selectedProject:any;
  handleSelectedProject:(val:any)=>void
}
const ProjectDetails = (props: IProps) => {
  const {selectedProject,handleSelectedProject} =props
  const [selectedScreenLayout,setSelectedScreenLayout]= useState<any>(selectedProject ?selectedProject.projectScreenLayouts[0] : null)
  const [showImageModal,setShowImageModal]= useState<boolean>(false)

  const toggleImageModal=(item:any)=>{

    setSelectedScreenLayout(item)
    setShowImageModal(!showImageModal)
  }

  const ProjectScreenShotItem = ({ item, index }: { item: any, index: number }) => {
    const [imageSrc, setImageSrc] = useState<string>(Images.ic_image_placeholder);

    useEffect(() => {
      const img = new Image();
      img.src = item.image;
      img.onload = () => setImageSrc(item.image);
      img.onerror = () => setImageSrc(Images.ic_image_placeholder);
    }, [item.image]);

    return (
      <div className={styles.screenLayoutColumn} key={index}>
                        <span className={styles.screenLayoutItemText}>
                          {item.title}
                        </span>

        {imageSrc === Images.ic_image_placeholder ?
          <div className={styles.screenLayoutImage}>
            <img
              className={styles.placeholderLogo}
              src={imageSrc}
              alt={item.title}
            />
          </div>
          :
          <div onClick={()=>toggleImageModal(item)}>

          <img
            className={styles.screenLayoutImage}
            src={imageSrc}
            alt={item.title}
          />
            </div>
        }

      </div>
    );
  };
  return (
    <>
      {showImageModal && <ImageGallery  onClose={()=>toggleImageModal(null)} imageList={selectedProject.projectScreenLayouts} showSelectedImage={selectedScreenLayout}/>}
        <div className={styles.projectDetailsView}>

          <div
            className={styles.backView}
            onClick={() => handleSelectedProject(null)}
          >
            <img src={Images.ic_back} className={styles.backArrow}  alt='back'/>
            <span>Back To Projects</span>
          </div>

          <div className={styles.selectedProjectMainView}>
            <div className={styles.rowView}>
              <img
                src={selectedProject.projectImage}
                className={styles.selectedProjectImageView}
              />
              <div className={styles.lineView} />
              <div className={styles.columnView}>
                <div className={styles.titleRowView}>
                  <span className={styles.projectTitle}>
                    {selectedProject?.projectName}
                  </span>
                  <div className={styles.smallLineView} />
                  <a
                    className={styles.projectPortfolio}
                    href={selectedProject?.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.projectPortfolio}>
                      Project Portfolio
                    </span>
                  </a>
                </div>

                <span className={styles.projectDescription}>
                  {selectedProject?.projectDescription}
                </span>
                <div className={styles.titleRowView}>
                  {selectedProject.projectTechStack.map((item: any) => (
                    <div className={styles.techStackItemView}>
                      <span>
                        {`#`}
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {selectedProject.releaseApkLink ? (
                <div className={styles.qrCodeMainView}>
                  <div className={styles.qrCodeStyle}>
                    <QRCode
                      ecLevel={'L'}
                      size={130}
                      qrStyle="dots"
                      logoWidth={50}
                      logoHeight={50}
                      eyeRadius={5}
                      logoPadding={2}
                      removeQrCodeBehindLogo={true}
                      logoPaddingStyle={'square'}
                      value={selectedProject.releaseApkLink}
                      fgColor={'#000000'}
                      eyeColor={selectedProject.primaryColor}
                    />
                  </div>
                  <span
                    className={styles.projectTitle}
                    id={styles.downloadAppText}
                  >
                    Download App
                  </span>
                </div>
              ) : null}
            </div>
            <div className={styles.screenLayoutMain}>
              <span className={styles.projectTitle}>Screen Layouts</span>
              <div className={styles.screenLayouts}>
                {selectedProject?.projectScreenLayouts.length > 0 &&
                selectedProject?.projectScreenLayouts.map(
                  (item: any, index: number) => (
                    <ProjectScreenShotItem item={item} index={index}/>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ProjectDetails
