import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData, setRepositories } from '../redux/userSlice';
import axios from 'axios';
import { config } from '../App';

const Home = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            // Perform API call to fetch user data and repositories
            let response = await axios.get(`${config.endpoint}/user/${username}`);
            const userData = response['data']['userDetails'];
            response = await axios.get(userData['repos_url']);
            const repositories = response.data;

            // Dispatch actions to update Redux store
            dispatch(setUserData(userData));
            dispatch(setRepositories(repositories));

            // Navigate to the user details page
            navigate(`/user/${username}`);  
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Home;