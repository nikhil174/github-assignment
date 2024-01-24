import express from 'express';
const router = express.Router();
import {
    getUser
} from '../controllers/user.controllers';

router.get('/:username', getUser);

export default router;