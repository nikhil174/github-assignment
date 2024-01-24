import express from 'express';
const router = express.Router();
import {
    getUser,
    softDeleteUser,
    updateUser,
    getAllUsers,
    searchUser
} from '../controllers/user.controllers';

router.get('/:username', getUser);
router.delete('/:username', softDeleteUser);
router.put('/all', getAllUsers);
router.put('/search', searchUser);
router.put('/:username', updateUser);

export default router;