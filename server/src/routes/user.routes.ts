import express from 'express';
const router = express.Router();
import {
    getUser,
    softDeleteUser
} from '../controllers/user.controllers';

router.get('/:username', getUser);
router.delete('/:username', softDeleteUser);

export default router;