import mongoose from 'mongoose';
import Phrasebook from '../models/Phrasebook.js';

export const getPhrasebooks = async (req, res) => {
    try {
        const getPhrasebooks = await Phrasebook.find();

        res.status(200).json(getPhrasebooks);
    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const createPhrasebook = async (req, res) => {
    const post = req.body;
    const newPost = new Phrasebook(post);

    try {
        await newPost.save();

        console.log("controler", post)

        res.status(201).json(createPhrasebook)
    } catch (error) {
        res.status(409).json({message: error})
    }
}


export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    
    const updatedPost = await PostBody.findByIdAndUpdate(_id, { ...post, _id}, { new: true })

    res.json(updatedPost);
}

export const deletePhrasebook = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    await Phrasebook.findByIdAndRemove(id);

    res.json({message: 'phrasebook deleted successfully'});
}




//EDIT WORDS
export const createWord = async (req, res) => {
  
    const { id: _id } = req.params;
    const newWord = req.body;

    
    const phrasebook = await Phrasebook.findById(_id)
    phrasebook.words.push(newWord)
    
    phrasebook.save()
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    
    res.json(phrasebook);
}


export const updateWord = async (req, res) => {
    
    const { id: _id } = req.params;
    const { wordId: wordId } = req.params

    const phrasebook = await Phrasebook.findById(_id)
    const word = phrasebook.words.filter(word => word._id == wordId)

    word[0].word = req.body.word
    word[0].note = req.body.note
    
    phrasebook.save()
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    
    res.json(phrasebook);
}



export const deleteWord = async (req, res) => {
    
    const { id: _id } = req.params;
    const { commentId: commentId } = req.params

    const phrasebook = await Phrasebook.findById(_id)
    const words = phrasebook.words.filter(word => word._id != commentId)

    phrasebook.words = words
    phrasebook.save()

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    
    res.json(phrasebook);
}