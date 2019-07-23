import { GET_POST, GET_POSTS, CREATE_POST, DELETE_POST, POST_ERROR, UPDATE_LIKES, ADD_COMMENT, DELETE_COMMENT } from '../action/types'
const initialState = {
    posts: [],
    post: null,
    loading: true,
   
    error: {}
}

export default (state = initialState, action) => {
    const { type, pyload } = action
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: pyload,
                loading: false,

            }
        case GET_POST:
            return {
                ...state,
                post: pyload,
                loading: false,

            }
        case CREATE_POST:
            return {
                ...state,
                posts: [pyload,...state.posts ],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts:state.posts.filter(post=>post._id !== pyload),
                loading:false
            }    
        case POST_ERROR:
            return {
                ...state,
                error: pyload,
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === pyload.id ? { ...post, likes: pyload.likes } : post),
                loading: false,
               
            }
       case ADD_COMMENT:
           return {
               ...state,
               post:{...state.post,comments:pyload },
               loading:false
           }
        case DELETE_COMMENT:
            return {
                ...state,
                comments:{...state.posts.comments.filter(comment=>comment._id !== pyload)},
                loading:false
            }
           
        default:
            return state
    }
}
