import styles from "./ImageGallery.module.css"
import { useState } from 'react'
import Images from '../../res/styles/Images'
interface ImageList{
  title:string,
  image:any
}
interface ImageGalleryProps {
  showSelectedImage:any
  imageList:Array<ImageList>
  onClose:()=>void
}
export const ImageGallery=(props:ImageGalleryProps)=>{
  const {imageList,showSelectedImage,onClose}=props;
  const [selectedImage,setSelectedImage]= useState<any>(showSelectedImage)

  const onNextClick=()=>{
    let selectedIndex = imageList.indexOf(selectedImage)
    setSelectedImage(imageList[selectedIndex + 1])
  }

  const onPreviousClick=()=>{
    let selectedIndex = imageList.indexOf(selectedImage)
    setSelectedImage(imageList[selectedIndex - 1])
  }
  let selectedIndex = imageList.indexOf(selectedImage);
  return(
    <div>
      {imageList && imageList.length > 0 ?
        <div className={styles.mainView}>
          <div className={styles.closeImageView} onClick={()=>onClose()}>
             <img src={Images.ic_close} className={styles.closeImage}/>
          </div>
          {selectedIndex > 0 &&
          <div className={styles.previousImageView} onClick={()=>onPreviousClick()}>
            <img src={Images.ic_next} className={styles.closeImage} id={styles.previousImage}/>
          </div>
          }
          {selectedIndex < imageList.length - 1 &&
          <div className={styles.nextImageView} onClick={()=>onNextClick()}>
            <img src={Images.ic_next} className={styles.closeImage}/>
          </div>
          }
          <div className={styles.titleView}>
            <span className={styles.title}>{selectedImage.title}</span>
          </div>
          <img src={selectedImage.image} className={styles.image} alt=''/>
        </div>
        :null
      }
    </div>
  )
}