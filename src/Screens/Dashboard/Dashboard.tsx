import styles from './Dashboard.module.css'
import CategoryTabs from '../CategoryTabs/CategoryTabs'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database' // Import the Realtime Database module
import { firebaseConfig } from '../../Stores/Firebase'
import { getDeveloperFirebase, setDeveloperData } from '../../Utils/Utils'
import UploadFile from '../UploadFile/UploadFile'
import DownloadFile from '../UploadFile/DownloadFile'

const Dashboard = () => {
  const [developerInfo, setDeveloperInfo] = useState<any>(undefined)

  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
    getDataFromFirebase()
  }, [])

  const getDataFromFirebase = () => {
    let developerData: any = []
    const portfolioRef = firebase.database().ref('/portfolio')
    Promise.all([portfolioRef.once('value')])
      .then((snapshots) => {
        // Extract data from the snapshots
        const portfolioNode = snapshots[0].val()

        let finalObject: any = {
          personalDetails: portfolioNode.personalDetails,
          social: portfolioNode.social,
          categories: portfolioNode.categories,
          projects: portfolioNode.projects,
          resumeData: portfolioNode.resumeData,
          allSkills: portfolioNode.allSkills,
        }
        developerData.push(finalObject)

        setDeveloperData(developerData)
        let devData = getDeveloperFirebase()
        setDeveloperInfo(devData)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })

    // Clean up function
    return () => {
      // Remove the event listeners if necessary
      portfolioRef.off()
    }
  }

  return (
    <>
      {developerInfo && (
        <>
          <UploadFile/>
          <DownloadFile/>
        </>

      )}
    </>
  )
}
export default Dashboard
