import React from 'react'
import { useSelector } from 'react-redux';
import './user.css';

const User = () => {
    const userData = useSelector((state) => state.user.userData);
    return (
        <div className="user-details">
            {userData && (
                <div className="user-details-container">
                    <img src={userData.avatar_url} alt="User Avatar" className="user-avatar" />
                    <p className="user-username">{userData.username}</p>
                    <p className="user-bio">{userData.bio}</p>
                </div>
            )}
        </div>
    )
}

export default User
