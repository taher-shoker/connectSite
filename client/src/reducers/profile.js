import {GET_PROFILE,UPDATE_PROFILE,PROFILE_ERROR,CLEAR_PROFILE, GET_PROFILES,GET_REPOS} from '../action/types'

const initialState = {
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    error:{}
}
export default (state=initialState,action)=>{
    const {type,pyload} = action
switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
        return {
            ...state,
            profile:pyload,
            loading:false
        }
  
    case GET_PROFILES :
        return {
            ...state,
            profiles:pyload,
            loading:false
        }    
    case PROFILE_ERROR:
        return {
            ...state,
            error:pyload,
            loading:false
        } 
    case CLEAR_PROFILE:
        return {
            ...state,
            profile:null,
            repos:[],
            loading:false
        }
   
    case GET_REPOS :
        return {
            ...state,
            repos:pyload,
            loading:false
        }    
    default:
        return state
}
}