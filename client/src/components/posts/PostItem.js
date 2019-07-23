import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment' 
import {Link} from 'react-router-dom'
import {addLike,deleteLike,deletePost} from '../../action/postActions'


const PostItem = ({
  post:{_id,text,name,avater,date,user,likes,comments},
  auth,
  addLike,deleteLike,deletePost}) => {

    const [displayIconsColor, toggleIconsColor] = useState(false);
    return (
        <>
          <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`profile/${user}`}>
              <img
                className="round-img"
                src={avater}
                alt={name}
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
            {text}
            </p>
             <p className="post-date">
                Posted on <Moment format='DD-MM-YYYY'>{date}</Moment>
            </p>
            <button 
            type="button" 
            onClick={e=>{ 
              addLike(_id)
              toggleIconsColor(!displayIconsColor)
            }}
            className={displayIconsColor ? 'btn btn-primary ':'btn btn-light'}
            disabled={displayIconsColor ? 'disabled':''} 
            >
              
              <i className="fas fa-thumbs-up"></i>
            {likes.length >0  && ( <span>{likes.length}</span>)}
            </button>
            <button 
              type="button"  
              onClick={e=>{ 
                deleteLike(_id)
                toggleIconsColor(!displayIconsColor)
                }}  
                className="btn btn-light"
                disabled={displayIconsColor ? '':'disabled'} 
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`post/${_id}`} className="btn btn-primary">
              Comments {comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}
            </Link>
            {!auth.loading && user === auth.user._id && (<button      
            type="button"
            className="btn btn-danger"
            onClick={e=>deletePost(_id)}
          >
            <i className="fas fa-times"></i>
          </button>)}
          
          </div>
        </div>  
        </> 
    )
}

PostItem.propTypes = {
post:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
addLike:PropTypes.func.isRequired,
deleteLike:PropTypes.func.isRequired,
deletePost:PropTypes.func.isRequired,


}
const mapStateToProps = state=> ({
    auth:state.auth
})

export default  connect(mapStateToProps,{addLike,deleteLike,deletePost})(PostItem)
