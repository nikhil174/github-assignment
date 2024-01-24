import express from 'express';
const router = express.Router();
import {
    getUser,
    softDeleteUser,
    updateUser
} from '../controllers/user.controllers';

router.get('/:username', getUser);
router.delete('/:username', softDeleteUser);
router.put('/:username', updateUser);

export default router;