import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowers } from '../redux/userSlice';
import axios from 'axios';

const Followers = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const followers = useSelector((state) => state.user.followers);
    const userData = useSelector((state) => state.user.userData);

    useEffect(() => {
        // Perform API call to fetch followers
        const fetchFollowers = async () => {
            console.log(userData);
            const response = await axios.get(userData['followers_url']);
            const followersData = response.data;
            console.log(followersData);
            // Dispatch action to update Redux store
            dispatch(setFollowers(followersData));
        };

        // Check if followers are not already fetched
        if (followers.length === 0) {
            fetchFollowers();
        }
    }, [dispatch, followers, userData]);

    return (
        <div>
            <h2>User Details for {username}</h2>
            {followers && followers.map((follower) => (
                <div key={follower.login}>
                    <p>{follower.login}</p>
                </div>
            ))}
        </div>
    );
};

export default Followers;
