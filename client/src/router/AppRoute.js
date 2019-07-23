import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


// Import components
import Navbar from '../components/layout/Navbar'
import Landing from '../components/layout/Landing'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Dashbord from '../components/dashboard/Dashboard'
import CreateProfile from '../components/profile-layout/CreateProfile'
import PrivateRoute from './PrivateRoute'

// Alert compoent
import Alert from '../components/layout/Alert'
import EditProfile from '../components/profile-layout/EditProfile';
import AddExperience from '../components/profile-layout/AddExperience';
import AddEducation from '../components/profile-layout/AddEducation';
import Profiles from '../components/profiles/Profiles';
import Profile from '../components/profile-layout/Profile'
import Posts from '../components/posts/Posts';
import post from '../components/singlePost/post';

export default function AppRoute() {
    return (
        <Router>
            <Navbar/>
           
            <Route exact path='/' component={Landing} />
            <div className='alert-style'>
            <Alert/>
            </div>
            <Switch>
               
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/profiles' component={Profiles} />
                <Route exact path='/profile/:id' component={Profile} />
                <PrivateRoute Route exact path='/dashboard' component={Dashbord} />
                <PrivateRoute Route exact path='/create-profile' component={CreateProfile} />
                <PrivateRoute Route exact path='/edit-profile' component={EditProfile} />
                <PrivateRoute Route exact path='/add-experience' component={AddExperience} />
                <PrivateRoute Route exact path='/add-education' component={AddEducation} />
                <PrivateRoute Route exact path='/posts' component={Posts} />
                <PrivateRoute Route exact path='/post/:id' component={post} />


            </Switch>
            
            
        </Router>

    )
} 
