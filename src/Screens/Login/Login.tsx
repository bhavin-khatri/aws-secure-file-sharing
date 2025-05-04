import React, { useEffect, useState } from 'react'
import styles from './Login.module.css';
import { signIn, signOut , getCurrentUser } from '@aws-amplify/auth'
import { useNavigate } from 'react-router-dom';
import { extractAfterColon, isValidEmail, logoutPreviousUsers } from '../../Utils/Utils'
import Images from '../../res/styles/Images'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    logoutPreviousUsers()
  },[])



  const handleLogin = () => {
    // Reset previous errors
    setErrorEmail('');
    setErrorPassword('');

    if (!email.trim()) {
      setErrorEmail('Email is required.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorEmail('Please enter a valid email address.');
      return;
    }

    if (!password.trim()) {
      setErrorPassword('Password is required.');
      return;
    }
    signInToAmplify()
  };

  async function signInToAmplify() {
    await signIn({ username: email, password: password }).then((data) => {
      console.log("data signIn ===== > ",data)
      if(data){
        if(data.isSignedIn){
          navigate('/dashboard');
        }
      }
    }).catch((err) => {
      console.log('error== > ', err)
      const cleanError = extractAfterColon(err.toString())
      setErrorPassword(cleanError)
    });
  }

  const togglePassword = ()=>{
    setShowPassword(!showPassword)
  }



  return (
    <div className={styles.mainView}>
      <div className={styles.loginBox}>
        <div className={styles.title}>Login</div>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Enter email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errorEmail && <div className={styles.error}>{errorEmail}</div>}
        <div className={styles.inputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password ?
            <img src={showPassword ? Images.ic_eye_hide : Images.ic_eye} className={styles.eyeIcon} onClick={togglePassword}/>
            :null
          }

        </div>
        {errorPassword && <div className={styles.error}>{errorPassword}</div>}
        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
