import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRepositories } from '../redux/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoBackBtn from './GoBackBtn';

const UserDetails = () => {
    const repositories = useSelector((state) => state.user.repositories);
    const userData = useSelector((state) => state.user.userData);
    const navigate = useNavigate();

    const handleRepoClick = (repoName) => {
        // Navigate to the repository details page
        navigate(`/repository/${repoName}`);
    };

    const handleFollowersClick = () => {
        // Navigate to the followers page
        navigate(`/user/${userData.username}/followers`);
    };

    return (
        <div>
            <GoBackBtn />
            <h2>User Details for {userData.username}</h2>
            <button onClick={handleFollowersClick}>View Followers</button>
            {repositories && repositories.map((repo) => (
                <div key={repo.id}
                    onClick={() => handleRepoClick(repo.name)}
                >
                    <p>{repo.name}</p>
                </div>
            ))}
        </div>
    );
};

export default UserDetails;
