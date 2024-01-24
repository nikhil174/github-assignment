import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoBackBtn from './GoBackBtn';
import './repoDetails.css';

const RepositoryDetails = () => {
    const { repoName } = useParams();
    const repositories = useSelector((state) => state.user.repositories);

    // Find the selected repository based on repoName
    const selectedRepo = repositories.find((repo) => repo.name === repoName);

    return (
        <div className='repository-details'>
            <GoBackBtn />
            {selectedRepo && (
                <div className="repo-des-container">
                    <div className="repo-des-avatar-container">
                        <img src={selectedRepo.owner.avatar_url} alt="User Avatar" className="user-avatar" />
                    </div>
                    <div className="repo-des-des-container">
                        <h2 className='repo-name'>{repoName}</h2>
                        <div className='repo-des-about'>
                            <p>{selectedRepo.full_name}</p>
                            <p>{selectedRepo.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepositoryDetails;