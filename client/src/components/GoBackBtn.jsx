import React from 'react'
import { useNavigate } from 'react-router-dom';
import './goBackBtn.css';

const GoBackBtn = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        // Navigate to the home page
        navigate('/');
    };
    return (
        <div className='goBackBtn-container'>
            <button className='goBackBtn' onClick={handleBackClick}>Go to Search</button>
        </div>
    )
}

export default GoBackBtn;
