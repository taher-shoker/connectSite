import axios from 'axios'
import {setAlert} from './alert'
import {REGISTER_SUCCESS, REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL, LOGOUT_SUCCESS,CLEAR_PROFILE} from './types'
import setAuthToken from '../uitils/setAuthToken'

// User loaded
export const loadUser =() => async dispatch=>{
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type:USER_LOADED,
            pyload: res.data
        })
    } catch (err) {
        dispatch({
            type:AUTH_ERROR,
           
        })
    }
}


// Register user 
export const register =({name,email,password})=>async dispatch=>{
const config = {
    headers:{
        'Conten-Type':'application/json'
    }
}
const body =({name,email,password})
try {
    const res =await axios.post('/api/users',body,config)
    dispatch({
        type:REGISTER_SUCCESS,
        pyload:res.data
    })
    dispatch(loadUser())
  
} catch (err) {
    const errors = err.response.data.errors
    if (errors) 
    {
        errors.forEach(error=> dispatch(setAlert(error.msg,'danger')))
    }
    dispatch({
        type:REGISTER_FAIL
    })
}
}

// Login user 
export const login =({email,password})=>async dispatch=>{
    const config = {
        headers:{
            'Conten-Type':'application/json'
        }
    }
    const body =({email,password})
    try {
        const res =await axios.post('/api/auth',body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            pyload:res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) 
        {
            errors.forEach(error=> dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }
    }
 // Logout user & Clear profile
 
 export const logout =()=> dispatch=>{
     dispatch({
         type:CLEAR_PROFILE
     })
     dispatch({
         type:LOGOUT_SUCCESS
     })
 }