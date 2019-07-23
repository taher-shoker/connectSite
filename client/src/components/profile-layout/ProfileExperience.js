import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience=({exp:{company,title,description,current,to ,from}})=> {
    return (
        <>
            <h3 className="text-dark">{company}</h3>
            <p><Moment format='DD-MM-YYYY'>{from}</Moment>  -{ to === null ? "Now" : (  <Moment format="YYYY/MM/DD">{to}</Moment>) } </p>
            <p><strong>Position: </strong>{title}</p>
            <p>
              <strong>Description: </strong>
              {description}
            </p>  
        </>
    )
}

ProfileExperience.propTypes = {
    exp:PropTypes.object.isRequired,
}

export default ProfileExperience

