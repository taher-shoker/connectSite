import React ,{useEffect}from 'react'
import PropTypes from 'prop-types'
import {GithubRepos} from '../../action/profileActions'
import {connect} from 'react-redux'


const ProfileGithub=({GithubRepos,username,repos})=> {
    useEffect(()=>{
        GithubRepos(username)
    },[GithubRepos,username]) 
    return (
        <> 
        {repos.map(repo=>(
            <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4><a href={`https://${username}.github.io/${repo.name}`} target="_blank"
                  rel="noopener noreferrer">{repo.name}</a></h4>
              <p>
              {repo.description? <>({repo.description})</>:<>({repo.full_name})</>}
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: {repo.stargazers_cont ? repo.stargazers_cont : '0' }</li>
                <li className="badge badge-dark">Watchers: {repo.watchers_cont? repo.watchers_cont : '0'}</li>
                <li className="badge badge-light">Forks: {repo.forks_cont ? repo.forks_cont : '0'}</li>
              </ul>
            </div>
          </div> 
        ))}
            
        </>
    )
}

ProfileGithub.propTypes = {
GithubRepos:PropTypes.func.isRequired,
repos:PropTypes.array.isRequired,
username:PropTypes.string.isRequired,
}
const mapStateToProps = state =>({
    repos:state.profile.repos
})

export default connect(mapStateToProps,{GithubRepos})(ProfileGithub)

