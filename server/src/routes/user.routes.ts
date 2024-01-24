import express from 'express';
const router = express.Router();
import {
    getUser,
    softDeleteUser,
    updateUser,
    getAllUsers
} from '../controllers/user.controllers';

router.get('/:username', getUser);
router.delete('/:username', softDeleteUser);
router.put('/all', getAllUsers);
router.put('/:username', updateUser);

export default router;