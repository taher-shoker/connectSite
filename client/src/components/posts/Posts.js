import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getPosts, createPost } from '../../action/postActions'
import { connect } from 'react-redux'
import PostItem from './PostItem'

const Posts = ({ getPosts, createPost, post: { posts, loading } }) => {
    const [text, setText] = useState('')


    const onChange = e => setText(e.target.value)
    const onSubmit = e => {
        e.preventDefault()
        createPost({ text })
        setText('')

    }
    useEffect(() => {
        getPosts()
    }, [getPosts])
    return (

        <>
            <section className="container">
                <h1 className="large text-primary">
                    Posts
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

                <div className="post-form">
                    <div className="bg-primary p">
                        <h3>Say Something...</h3>
                    </div>
                    <form className="form my-1" onSubmit={e => onSubmit(e)}>
                        <textarea
                            name="text"
                            cols="30"
                            rows="5"
                            placeholder="Create a post"
                            value={text}
                            onChange={e => onChange(e)}

                        ></textarea>
                        <input type="submit" className="btn btn-dark my-1" value="Submit" />
                    </form>
                </div>
                <div className="posts">
                    {posts.length > 0 ?

                        posts.map(post => (
                            <PostItem key={post._id} post={post} />
                        ))

                        : <> <h4>There Is No Posts </h4>  </>}
                </div>
            </section>
        </>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts, createPost })(Posts)

