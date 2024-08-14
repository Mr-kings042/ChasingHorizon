const asynchandler = require('express-async-handler');
const mongoose = require('mongoose');
const Post = require('../../models/Post');

const Comment = require('../../models/Comment');

const createComment = asynchandler(async(req,res)=>{
    const userID = req.user.userId;
    const postId = req.params.id;
    const {body} = req.body;

    //check if post Id is valid
isValid = mongoose.Types.ObjectId.isValid(postId);
if(!isValid) {
    return res.status(400).json({message: 'Invalid Post Id'});
    }

    const post = await Post.findById(postId);
    if(!post) {
        return res.status(404).json({message:'Post not found'});
        }
    //     //check if user is the owner of the post
    //     if(post.userId.toString() !== userID) {
    //         return res.status(403).json({message:'You are not the owner of this post'});
    //             //check if comment already exists
    //             const comment = await Comment.findOne({postId:postId,userId:userID})
    //             if(comment) {
    //                 return res.status(400).json({message:'You have already commented on this post'});
    //                 }
if(!body){
    return res.status(400).json({message:'Please provide a comment'});
}
   
    const comment = new Comment({
        body,
        post: postId,
        user: userID});
    await comment.save()
    post.comments.push(comment._id);
    await post.save();
    res.status(201).json({message:"Comment created successfully",
        comment
    })
  
});
module.exports = createComment;