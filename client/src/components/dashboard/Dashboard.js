import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../action/profileActions';
import DashboardButtons from './DashboardButtons'
import Experiences from './Experiences'
import Education from './Educations'
import Spinner from '../common/Spinner';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth, profile: { profile, loading }, history }) => {


  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  let dashboardContent;

  if (profile === null && loading) {

    (dashboardContent = <Spinner />);
  }
  // Check if logged in user has profile data
  else if (profile !== null) {
    (dashboardContent =
      <>
        <p className="lead text-muted">Welcome {auth.user.name}</p>
        <DashboardButtons />
        <Experiences experiences={profile.experience} />
        <Education educations={profile.education} />
        <div className="my-2">
          <Link to='/'
            className="btn btn-danger"
            onClick={() => (
              deleteAccount(history)


            )

            }
          >
            <i className="fas fa-user-minus pr-2"></i>

               Delete My Account
            </Link>
        </div>
      </>);
  }
  else {
    // User is logged in but has no profile 
    dashboardContent = (
      <div className='container'>
        <p className="lead text-muted">Welcome {auth.user.name}</p>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-lg btn-info  btn-primary">
          Create Profile
        </Link>
      </div>
    );
  }



  return (
    <section>
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
