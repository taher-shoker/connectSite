import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteComment } from '../../action/postActions';

const DisplayComments = ({ comment: { _id, text, user, name, date, avater }, postId, auth, deleteComment }) => {
    return (
        <>


            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            className="round-img"
                            src={avater}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {text}
                    </p>
                    <p className="post-date">
                        <Moment format='DD-MM-YYYY' >{date}</Moment>
                    </p>
                    {!auth.loading && user === auth.user._id && (<button
                        type="button"
                        className="btn btn-danger"
                        onClick={e => deleteComment(_id)}
                    >
                        <i className="fas fa-times"></i>
                    </button>)}
                </div>
            </div>

        </>
    )
}

DisplayComments.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.number.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(DisplayComments)
