import mongoose from 'mongoose';
import PostBody from '../models/PostBody.js';

export const getPosts = async (req, res) => {
    try {
        const getPosts = await PostBody.find();

        res.status(200).json(getPosts);
    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostBody(post);

    try {
        await newPost.save();

        console.log("controler", post)

        res.status(201).json(newPost)
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

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    await PostBody.findByIdAndRemove(id);

    console.log('delete post')

    res.json({message: 'post deleted successfully'});
}




//EDIT COMMENT FUNCTION - working
export const updateComment = async (req, res) => {
    
    const { id: _id } = req.params;
    const { commentId: commentId } = req.params

    const comment = await PostBody.findById(_id)
    const reply = comment.lingRepliesObj.filter(reply => reply._id == commentId)

    console.log(reply[0].replyBody)
    
    
    reply[0].replyBody = req.body.replyBody

    if (req.body.correctionBody !== "") {reply[0].replyType = "correction", reply[0].correctionBody = req.body.correctionBody}

    comment.save()
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    
    //const updatedComment = await PostBody.findByIdAndUpdate(_id, { ...post, _id}, { new: true })

    res.json(comment);
}



export const deleteComment = async (req, res) => {
    
    const { id: _id } = req.params;
    const { commentId: commentId } = req.params

    const comment = await PostBody.findById(_id)
    const replies = comment.lingRepliesObj.filter(reply => reply._id != commentId)

    console.log(replies)

    comment.lingRepliesObj = replies
    comment.save()
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    
    //const updatedComment = await PostBody.findByIdAndUpdate(_id, { ...post, _id}, { new: true })

    res.json(comment);
}