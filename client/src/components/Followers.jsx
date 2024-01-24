import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowers, setRepositories, setUsername } from '../redux/userSlice';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
import { config } from '../App'
import GoBackBtn from './GoBackBtn';
import User from './User';
import './followers.css';

const Followers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const followers = useSelector((state) => state.user.followers);

    const handleClick = async (username) => {
        try {
            // Perform API call to fetch user data and repositories
            let response = await axios.get(`${config.endpoint}/user/${username}`);
            const userData = response['data']['userDetails'];
            response = await axios.get(userData['repos_url']);
            const repositories = response.data;
            response = await axios.get(userData['followers_url']);
            const followersData = response.data;

            // Dispatch actions to update Redux store
            dispatch(setUserData(userData));
            dispatch(setRepositories(repositories));
            dispatch(setFollowers(followersData));
            dispatch(setUsername(userData.username));

            // Navigate to the user details page
            navigate(`/user/${username}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="followers-container">
            <GoBackBtn />
            <User />
            <h2 className='followers-heading'>Followers</h2>
            <ul className="followers-list">
                {followers && followers.map((follower) => (
                    <li key={follower.login} className="follower-item"
                        onClick={() => handleClick(follower.login)}
                    >
                        <img src={follower.avatar_url} alt="Follower Avatar" className="follower-avatar" />
                        <p className="follower-username">{follower.login}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Followers;
