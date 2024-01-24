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
            <h2>Repository Details for {repoName}</h2>
            {/* Display repository details */}
            {selectedRepo && (
                <div>
                    <p>Name: {selectedRepo.name}</p>
                    <p>Description: {selectedRepo.description}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
};

export default RepositoryDetails;