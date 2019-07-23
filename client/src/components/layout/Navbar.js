import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../action/auth'
//import { FontAwesomeIcon } from '@fortawesome/fontawesome-free'
/* import { faCoffee } from '@fortawesome/free-solid-svg-icons' */

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const gustLinks = (
    <>
      <li><Link to="/profiles">Developers</Link></li>


      <li><Link to="/register" title="Register">
        <span className="hide-sm">Register</span>
      </Link></li>
      <li><Link to="/login" title="Login">
        <i className="hide-sm fas fa-sign-out-alt"></i>
        <span className="">Login</span>
      </Link></li>
    </>
  )
  const authLinks =
    (
      <>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/posts">Posts</Link></li>  | 
        <li>
            <Link to='/dashboard'>
            <i className="hide-sm fas fa-tachometer-alt"></i>
            <span className="hide-sm">Dashboard</span>
            </Link>
        </li>
        <li>  <Link to='/login' className='logout' onClick={logout} title="Logout">
          <i className="fas fa-sign-out-alt"></i>

          <span className="hide-sm">Logout</span>
        </Link></li>


      </>
    )
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i>
          {/* <FontAwesomeIcon icon={faCoffee}/> */}DevConnector</Link>
      </h1>
      <ul>


        {!loading && (<>{isAuthenticated ? authLinks : gustLinks}</>)}

      </ul>
    </nav>
  );
}
Navbar.prototype = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  auth: state.auth,

})
export default connect(mapStateToProps, { logout })(Navbar)