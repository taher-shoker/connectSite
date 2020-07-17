import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ProfileItem = ({
    profile:{
        user:{_id,name,avater},
        company,
        location,
        status,
        skills
    }}) => {
    return (
        <>  
         <div className="profile bg-light">
                             <img
                                  className="round-img"
                                 src={avater}
                                 alt={name}
                             />
                             <div>
                                 <h2>{name}</h2>
                                 <p>{status}  {company && <>at</>}  {company}</p>
                                 <p>{location}</p>
                                 <Link to={`profile/${_id}`}  className="btn btn-primary">View Profile</Link>
                             </div>
      
                             <ul>
                               {skills.slice(0,4).map((skill,i)=> (
                                        <li className="text-primary" key={i}>
                                        <i className="fas fa-check"></i> {skill}
                                    </li>
                                 ))}  
                               
                             </ul>
                         </div>
        </>
    )
}

 ProfileItem.propTypes = {
    profile:PropTypes.object.isRequired,
} 

export default ProfileItem