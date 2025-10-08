import React from 'react'
import HomeScreen from "./homeScreen";
import AuthScreen  from './authScreen';
import userStore from '../../store/userStore';
function home() {
  const {user}=userStore();
  return (
    < >
      {user ? <HomeScreen/>: <AuthScreen/>}

   
    </>
  )
}

export default home