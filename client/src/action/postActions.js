import axios from 'axios'
import {setAlert} from './alert'
import {GET_POST,GET_POSTS,CREATE_POST,DELETE_POST, POST_ERROR, UPDATE_LIKES, ADD_COMMENT,DELETE_COMMENT} from './types'


// Get all posts 

export const getPosts = () =>async dispatch =>{
    
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type:GET_POSTS,
            pyload:res.data
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            pyload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}

// Get Post
export const getPost = id =>async dispatch =>{
    
    try {
        const res = await axios.get(`/api/posts/${id}`)
        dispatch({
            type:GET_POST,
            pyload:res.data
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            pyload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}

// Create post
export const createPost = (formData) =>async dispatch =>{
    
    try {
     const config= {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/api/posts',formData,config)
        dispatch({
            type:CREATE_POST,
            pyload:res.data
        })
     dispatch(setAlert('Post Addded','success'))
        
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            pyload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}


// Add like to post
export const addLike = id =>async dispatch =>{
    
    try {
        const res = await axios.put(`/api/posts/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            pyload:{id,likes:res.data}
        })
        
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            pyload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}
// Delete like to post
export const deleteLike = (id) =>async dispatch =>{
    
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            pyload:{id,likes:res.data}
        })
        
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            pyload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}
// Delete post
export const deletePost = id =>async dispatch =>{
    
    try {
       await axios.delete(`/api/posts/${id}`)
        dispatch({
            type:DELETE_POST,
            pyload:id
        })
       dispatch(setAlert('Post Removed','success')) 
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            pyload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}

// Add comment 
export const addComment = (postId,formData) =>async dispatch =>{
    
    try {
     const config= {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post(`/api/posts/comments/${postId}`,formData,config)
        dispatch({
            type:ADD_COMMENT,
            pyload:res.data
        })
       
     dispatch(setAlert('Comment Addded','success'))
        
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            pyload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}


// Delete comment 
export const deleteComment = (postId,commentId) =>async dispatch =>{
    
    try {
     
        await axios.delete(`/api/posts/comments/${postId}/${commentId}`)
        dispatch({
            type:DELETE_COMMENT,
            pyload:commentId
        })
     dispatch(setAlert('Comment Removed','success'))
        
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            pyload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}
