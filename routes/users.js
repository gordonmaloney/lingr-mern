import express from 'express';

import { signin, signup, editProfile, updateProfile } from '../controllers/users.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/edit', editProfile)

router.patch('/:id', updateProfile)

export default router;