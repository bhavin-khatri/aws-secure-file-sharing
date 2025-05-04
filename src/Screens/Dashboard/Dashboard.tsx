import styles from './Dashboard.module.css'
import React, { useState } from 'react'
import 'firebase/compat/database' // Import the Realtime Database module
import ProductList from '../ProductList/ProductList'
import Images from '../../res/styles/Images'
import { logoutPreviousUsers } from '../../Utils/Utils'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();
  const [showLogoutPopUp,setShowLogoutPopUp] = useState(false)

  const logout = async () => {
    try {
      await logoutPreviousUsers(); // AWS Amplify sign out
      navigate('/'); // Redirect to login
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <>

      {showLogoutPopUp ?
        <div className={styles.logoutView}>
          <div className={styles.logoutCurveView}>
            <text className={styles.logoutTitlePopup}>Are you sure you want to logout?</text>
            <div className={styles.rowView}>
              <button className={styles.logoutButton} onClick={()=>setShowLogoutPopUp(false)}>Cancel</button>
              <button id={styles.activeLogout} className={styles.logoutButton} onClick={logout}>Logout</button>
            </div>
          </div>

        </div>
        :<div>
          <div className={styles.navbar}>
            <div className={styles.nameView}>
              <span className={styles.nameText}>{`<`}</span>
              <span id={styles.headerTitle} className={styles.nameText}>
               Secure File Sharing
            </span>

              <div className={styles.nameText}>{`/>`}</div>
            </div>
            <img src={Images.ic_logout} className={styles.logoutIcon} onClick={()=>setShowLogoutPopUp(true)}/>
          </div>
          <ProductList/>
        </div>
      }

    </>
  )
}
export default Dashboard
