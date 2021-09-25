import express from 'express';

import { signin, signup, editProfile } from '../controllers/users.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/:user', editProfile)

export default router;