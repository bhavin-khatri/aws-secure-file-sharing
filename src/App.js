import './App.css';
import Main from './Navigation/Main';
import { createContext, useEffect, useState } from 'react'
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import {getCurrentUser, signIn } from '@aws-amplify/auth'
const Context = createContext();

// ✅ This is all you need
Amplify.configure(awsconfig);
const username = process.env.REACT_AMPLIFY_USERNAME;
const password = process.env.REACT_AMPLIFY_PASSWORD;
const App = () => {
    const [mapData, setMapData] = useState();
  useEffect(() => {
    const checkAndSignIn = async () => {
      try {
        await getCurrentUser(); // ✅ If this works, user is already signed in
        console.log('User is already signed in');
      } catch {
        // 🔐 If not signed in, then do sign in
        try {
          signInToAmplify()
        } catch (err) {
          console.error('Sign in error:', err);
        }
      }
    };

    checkAndSignIn();
  }, []);

  async function signInToAmplify() {
    await signIn({ username: username, password: password }).then((data) => {
      console.log(data)
    }).catch((err) => console.log("error== > ", err));
  }
    return (
        <Context.Provider value={[mapData, setMapData]}>
            <Main />
        </Context.Provider>
    );
};

export default App;
