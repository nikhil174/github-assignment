import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRepositories } from '../redux/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoBackBtn from './GoBackBtn';
import User from './User';
import './userDetails.css';

const UserDetails = () => {
    const username = useSelector((state) => state.user.username);
    const repositories = useSelector((state) => state.user.repositories);

    const navigate = useNavigate();

    const handleRepoClick = (repoName) => {
        // Navigate to the repository details page
        navigate(`/repository/${repoName}`);
    };

    const handleFollowersClick = () => {
        // Navigate to the followers page
        navigate(`/user/${username}/followers`);
    };

    return (
        <div>
            <GoBackBtn />
            <User />
            <div className='viewFollowBtn-container'>
                <button className='viewFollow-btn' onClick={handleFollowersClick}>View Followers</button>
            </div>
            <div className='repo-list'>
                {repositories && repositories.map((repo) => (
                    <div key={repo.id} className='repo-item' onClick={() => handleRepoClick(repo.name)}>
                        <img src={repo.owner.avatar_url} alt='Avatar' className='repo-avatar' />
                        <div className='repo-des-container'>
                            <p className='repo-title'>{repo.name}</p>
                            <p className='repo-description'>{repo.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDetails;
