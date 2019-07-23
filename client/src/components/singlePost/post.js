import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { getPost } from '../../action/postActions'
import CommentForm from './commentForm';
import DisplayComments from './displayComments';
import Moment from 'react-moment'



const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id])

    return post === null || loading ? (<Spinner />) : (<>
                <section className="container">
                    <Link to="/posts" className="btn">Back To Posts</Link>
                    <div className="post bg-white p-1 my-1">
                        <div>
                            <Link to={`/profile/${post.user}`}>
                                <img
                                    className="round-img"
                                    src={post.avater}
                                    alt=""
                                />
                                <h4>{post.name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className="my-1">
                                {post.text}
                            </p>
                            <p className="post-date">
                               Posted on <Moment format='DD-MM-YYYY'>{post.date}</Moment>
                           </p>
                        </div>
                        
                    </div>
                <CommentForm postId={post._id}/>
                <div className="comments">
                    {post.comments.length <= 0 ? <><Spinner/><p>There is no Comments for this post  </p></> : <>  {post.comments.map(comment => (
                    <DisplayComments key={comment._id} comment={comment} post={post._id}/>
                  ))}  
                </> }
                
                </div>
                </section>
            </>
            )



}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
