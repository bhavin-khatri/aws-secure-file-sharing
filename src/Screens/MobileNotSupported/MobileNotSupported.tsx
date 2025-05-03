import styles from './MobileNotSupported.module.css'
import 'firebase/compat/database' // Import the Realtime Database module
const MobileNotSupported = () => {
  return (
    <div className={styles.mainView}>
      <h1>Mobile Devices Not Supported</h1>
      <p>
        This web application is designed for desktop browsers. Please visit
        using a desktop or laptop computer.
      </p>
    </div>
  )
}
export default MobileNotSupported
