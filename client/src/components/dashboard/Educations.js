import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Moment from 'react-moment'
import {deleteEducation} from '../../action/profileActions'

const Educations=({educations,deleteEducation})=> {
    return (
        <>
     <h2 className="my-2">Education Credentials</h2>
     {educations.length > 0? <>
      <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th className="hide-sm">Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
          {
            educations.map(edu=>(
                    <tr key={edu._id}>
                    <td>{edu.school}</td>
                    <td className="hide-sm">{edu.degree}</td>
                    <td className="hide-sm">
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {' '}
                  {
                      edu.to === null ? "Now" : (  <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                      )
                  }
                    </td>
                    <td className="hide-sm">{edu.description}</td>
                    <td>
                      <button 
                       className="btn btn-danger"
                       onClick={()=> deleteEducation(edu._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>
     </>:<> <p>Your Profile Not contain Education ,Please Add Education </p>  </> }
     

        </>
    )
}
Educations.propTypes={
    educations:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired,
}

export default connect(null,{deleteEducation})(Educations)
