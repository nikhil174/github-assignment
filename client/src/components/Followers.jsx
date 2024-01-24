import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowers, setRepositories, setUsername } from '../redux/userSlice';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
import { config } from '../App'
import GoBackBtn from './GoBackBtn';

const Followers = () => {
    const { username } = useParams();
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
        <div>
            <GoBackBtn />
            <h2>User Details for {username}</h2>
            {followers && followers.map((follower) => (
                <div key={follower.login}
                    onClick={() => handleClick(follower.login)}
                >
                    <p>{follower.login}</p>
                </div>
            ))}
        </div>
    );
};

export default Followers;
