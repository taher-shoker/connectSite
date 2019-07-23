import React,{useEffect} from 'react';
import AppRoute from './router/AppRoute'
import Footer from './components/layout/Footer'
import './App.css';

// redux
import {Provider} from 'react-redux'
import store from './store/store'
import setAuthToken from './uitils/setAuthToken'
import {loadUser} from './action/auth'

// check auth by token

const App = () => {
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  }
 useEffect(()=>{
  store.dispatch(loadUser()) 
  },[])  
  return (
    <>
      <Provider store={store}>
        <AppRoute /> 
        <Footer />

      </Provider>

    </>

  );
}


export default App
