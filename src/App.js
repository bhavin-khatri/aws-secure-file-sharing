import './App.css';
import Main from './Navigation/Main';
import { createContext, useEffect, useState } from 'react'
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
const Context = createContext();

// ✅ This is all you need
Amplify.configure(awsconfig);
const App = () => {
    const [mapData, setMapData] = useState();
    return (
        <Context.Provider value={[mapData, setMapData]}>
            <Main />
        </Context.Provider>
    );
};

export default App;
