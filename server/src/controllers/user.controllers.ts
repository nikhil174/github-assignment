import { Request, Response } from 'express';
import axios from 'axios';
import pool from '../config/db/db';

const fetchData = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};

const getCommonUsers = (following: any[], followers: any[]): any[] => {
    const loginsArray1 = followers.map(user => user.login);
    const loginsArray2 = following.map(user => user.login);
    const commonLogins = loginsArray1.filter(login => loginsArray2.includes(login));
    return commonLogins;
};

interface UserDetails {
    id: number;
    username: string;
    name: string;
    avatar_url: string;
    repos_url: string;
    following_url: string;
    followers_url: string;
    location: string;
    blog: string;
    bio: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: Date;
    deleted: boolean;
}

const getUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;

        if (!username || username.trim().length === 0) {
            throw new Error('Invalid username');
        }

        // Use pool.query directly for asynchronous query execution
        const userResult = await pool.query<UserDetails>('SELECT * FROM users WHERE username = $1 LIMIT 1', [username]);

        if (userResult.rows.length > 0) {
            const userDetails = userResult.rows[0];

            if (userDetails.deleted) {
                // If the user is marked as deleted, update the deleted field to false
                await pool.query('UPDATE users SET deleted = false WHERE id = $1', [userDetails.id]);
            }

            res.status(200).json({
                success: true,
                userDetails,
            });
        } else {
            const userDetailsResponse = await axios.get(`https://api.github.com/users/${username}`);
            const { login, name, avatar_url, repos_url, following_url, followers_url, location, blog, bio, public_repos, public_gists, followers, following, created_at } = userDetailsResponse.data;

            const newUserResult = await pool.query(`
                          INSERT INTO users (
                            username, name, avatar_url, repos_url, following_url, followers_url,
                            location, blog, bio, public_repos, public_gists, followers, following, created_at
                          )
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                          RETURNING *;
                        `, [login, name, avatar_url, repos_url, following_url, followers_url, location, blog, bio, public_repos, public_gists, followers, following, created_at]);

            const newUserDetails = newUserResult.rows[0];

            // Fetch following and followers data
            const promiseArray = [fetchData(`https://api.github.com/users/${username}/following`), fetchData(`https://api.github.com/users/${username}/followers`)]
            const followData = await Promise.all(promiseArray);

            // Find common users
            const friends = getCommonUsers(followData[0], followData[1]);

            await pool.query('UPDATE users SET friends = $1 WHERE id = $2', [friends, newUserDetails.id]);

            res.status(200).json({
                success: true,
                userDetails: newUserDetails,
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

const softDeleteUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        if (!username || username.trim().length === 0) {
            throw new Error('Invalid username');
        }

        const userDetails = await pool.query<UserDetails>('SELECT * FROM users WHERE username = $1 AND deleted = false', [username]);

        if (userDetails.rows.length === 0) {
            throw new Error('User not found');
        }

        const user = userDetails.rows[0];
        user.deleted = true;

        await pool.query('UPDATE users SET deleted = true WHERE id = $1', [user.id]);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const { location, blog, bio } = req.body;
        const { username } = req.params;

        if (!username || username.trim().length === 0) {
            throw new Error('Invalid username');
        }

        if (!location && !blog && !bio) {
            throw new Error('Invalid request');
        }

        const userResult = await pool.query<UserDetails>('SELECT * FROM users WHERE username = $1', [username]);

        if (userResult.rows.length === 0) {
            throw new Error('User not found');
        }

        let user = userResult.rows[0];
        let query = 'UPDATE users SET';
        if (location) query += ` location = '${location}',`;
        if (blog) query += ` blog = '${blog}',`;
        if (bio) query += ` bio = '${bio}',`;

        // Remove the trailing comma if there are conditions
        if (query.endsWith(',')) {
            query = query.slice(0, -1); // Remove the trailing comma
        }

        query += ` WHERE id = ${user.id}`;
        await pool.query(query);
        // Fetch the updated user details
        const updatedUserResult = await pool.query<UserDetails>('SELECT * FROM users WHERE username = $1', [username]);
        const updatedUser = updatedUserResult.rows[0];
        res.status(200).json({
            success: true,
            updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { key, type } = req.body;

        if (type !== 'ASC' && type !== 'DESC') {
            throw new Error('Invalid Sorting type');
        }

        const query = `SELECT * FROM users WHERE deleted = false ORDER BY ${key} ${type}`;
        const usersResult = await pool.query<UserDetails>(query);
        const users = usersResult.rows;

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

const searchUser = async (req: Request, res: Response) => {
    try {
        const searchQuery: Record<string, string> = req.body;
        const conditions: string[] = [];
        const values: string[] = [];

        for (const key in searchQuery) {
            conditions.push(`${key} ILIKE $${conditions.length + 1}`);
            values.push(`%${searchQuery[key]}%`);
        }

        let query;
        if (conditions.length > 0) {
            query = `SELECT * FROM users WHERE ${conditions.join(' OR ')} AND deleted = false`;
        } else {
            query = `SELECT * FROM users WHERE deleted = false`;
        }
        // console.log(query);
        const userResult = await pool.query<UserDetails>(query, values);

        res.status(200).json({
            success: true,
            users: userResult.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

export {
    getUser,
    softDeleteUser,
    updateUser,
    getAllUsers,
    searchUser
}