import React from 'react'
import { useNavigate } from 'react-router-dom';

const GoBackBtn = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        // Navigate to the home page
        navigate('/');
    };
    return (
        <div>
            <button onClick={handleBackClick}>Go to Search</button>
        </div>
    )
}

export default GoBackBtn;
