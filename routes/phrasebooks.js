import express from 'express';

import { getPhrasebooks, createPhrasebook, updatePost, deletePhrasebook, createWord, updateWord, deleteWord } from '../controllers/phrasebooks.js'

const router = express.Router();

router.get('/', getPhrasebooks);
router.post('/', createPhrasebook);
//router.patch('/:id', updatePost);
router.delete('/:id', deletePhrasebook);

router.post('/:id', createWord);
router.patch('/:id/:commentId', updateWord)
router.delete('/:id/:commentId', deleteWord)

export default router;