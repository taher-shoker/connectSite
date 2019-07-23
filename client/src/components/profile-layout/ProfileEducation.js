import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
const ProfileEducation=({education:{school,to,from,description,degree,fieldofstudy}})=> {
    return (
        <>
            <h3>{school}</h3>
            <p><Moment format='DD-MM-YYYY' >{from}</Moment>  - { to === null ? "Now" : (  <Moment format="YYYY/MM/DD">{to}</Moment>)}</p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Field Of Study: </strong>{fieldofstudy}</p>
            <p>
              <strong>Description: </strong>{description}
            </p> 
        </>
    )
}

ProfileEducation.propTypes = {
education:PropTypes.object.isRequired,
}

export default ProfileEducation

