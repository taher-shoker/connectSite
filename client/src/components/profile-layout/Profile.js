import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'
import { getProfileById } from '../../action/profileActions'
import ProfileTop from '../profile-layout/ProfileTop'
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub'

const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    return (

        <>

            {profile === null || loading ? (<Spinner />) : (<>
                <section className='container'>
                    <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn btn-info'> Edit Profile </Link>)}
                    <>
                        <div className="profile-grid my-1">
                            <ProfileTop profile={profile} />
                            <ProfileAbout profile={profile} />
                            <div className="profile-exp bg-white p-2">
                                <h2 className="text-primary">Experience</h2>

                                {profile.experience.length > 0 ? (<>{
                                    profile.experience.map(exp => (
                                        <ProfileExperience key={exp._id} exp={exp} />
                                    ))
                                }</>) : (<h4> No Experience Found </h4>)}
                            </div>
                            <div className="profile-edu bg-white p-2">
                                <h2 className="text-primary">Education</h2>
                                {profile.education.length > 0 ? (<>{
                                    profile.education.map(education => (
                                        <ProfileEducation key={education._id} education={education} />
                                    ))
                                }</>) : (<h4> No Education Found </h4>)}
                            </div>
                            <div className="profile-github">
                                <h2 className="text-primary my-1">
                                    <i className="fab fa-github"></i> Github Repos
                                </h2>
                                {profile.githubusername ?
                                   (<ProfileGithub username={profile.githubusername}/>) :  (<>
                                       <Spinner/>
                                   <h4> There is no repos for  {profile.user.name}'s profile </h4></>)
                                }
                            </div>
                        </div>
                    </>
                </section>
            </>
            )}

        </>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)
