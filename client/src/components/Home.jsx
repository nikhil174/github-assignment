import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFollowers, setRepositories, setUserData, setUsername } from '../redux/userSlice';
import axios from 'axios';
import { config } from '../App';

const Home = () => {
    const [localUsername, setLocalUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector((state) => state.user.username);

    const handleSearch = async () => {
        try {
            if (username !== localUsername) {
                // Perform API call to fetch user data and repositories
                let response = await axios.get(`${config.endpoint}/user/${localUsername}`);
                const userData = response.data.userDetails;
                response = await axios.get(userData.repos_url);
                const repositories = response.data;
                response = await axios.get(userData.followers_url);
                const followersData = response.data;

                // Dispatch actions to update Redux store
                dispatch(setUserData(userData));
                dispatch(setRepositories(repositories));
                dispatch(setFollowers(followersData));
                dispatch(setUsername(localUsername));
            }

            // Navigate to the user details page
            navigate(`/user/${localUsername}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Home;