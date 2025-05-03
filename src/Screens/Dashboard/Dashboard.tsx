import styles from './Dashboard.module.css'
import React from 'react'
import 'firebase/compat/database' // Import the Realtime Database module
import ProductList from '../ProductList/ProductList'

const Dashboard = () => {
  return (
    <>
      <div>
        <div className={styles.navbar}>
          <div className={styles.nameView}>
            <span className={styles.nameText}>{`<`}</span>
            <span id={styles.headerTitle} className={styles.nameText}>
               Secure File Sharing
            </span>
            <div className={styles.nameText}>{`/>`}</div>
          </div>

        </div>
        <ProductList/>
      </div>
    </>
  )
}
export default Dashboard
