import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Moment from 'react-moment'
import {deleteExperience} from '../../action/profileActions'

const Experiences = ({experiences,deleteExperience}) => {
    return (
        <>
            
        <h2 className="my-2">Experience Credentials</h2>
        {experiences.length > 0 ? <> <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Location</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm">Description</th>
            <th/>
          </tr>
        </thead>
        <tbody>
        {
              
            experiences.map(exp=>
             (
               
                <tr key={exp._id}>
                    <td>{exp.company}</td>
                    <td>{exp.location}</td>
                    <td className="hide-sm">{exp.title}</td>
                    <td >
                  <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {' '}
                  {
                      exp.to === null ? "Now" : (  <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                      )
                  }
                
               
                    </td>
                    <td className="hide-sm">{exp.description}</td>
                    <td>
                    <button 
                      className="btn btn-danger"
                      onClick={()=>deleteExperience(exp._id)}
                    >
                        Delete
                    </button>
                    </td>
              </tr>
            )   
            
            )
        }
        </tbody>
      </table> </>: <><p>Your Profile Not contain Experience ,Please Add Experience </p> </>}
     
      </>
    )
}

Experiences.propTypes={
    experiences:PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired,

}
export default connect(null,{deleteExperience})(Experiences)
