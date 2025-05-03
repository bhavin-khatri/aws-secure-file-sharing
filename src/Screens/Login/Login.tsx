import React, { useState } from 'react';
import styles from './Login.module.css';
import { signIn } from '@aws-amplify/auth'
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from '../../Utils/Utils'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const navigate = useNavigate();

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
      setErrorPassword(err.toString())
    });
  }



  return (
    <div className={styles.mainView}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login</h2>
        <input
          type="email"
          placeholder="Enter email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorEmail && <div className={styles.error}>{errorEmail}</div>}
        <input
          type="password"
          placeholder="Enter password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorPassword && <div className={styles.error}>{errorPassword}</div>}
        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
