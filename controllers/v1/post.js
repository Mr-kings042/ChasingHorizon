const asynchandler = require('express-async-handler');
const Post = require('../../models/Post');
const mongoose = require('mongoose');


const createPost = asynchandler(async (req,res) =>{
    const {title,content,tags,thumbnail} = req.body;
    const userID = req.user.userId;

if (!title || !content || !thumbnail){
  return res.status(400).send({message: "Please provide Title,Content and thumbnail"});
}
if (tags.length <= 0 || !tags){
    return res.status(400).send({message: "Please provide at least one tag"});
}

//check if tags are valid
const validTags = tags.every((tags) => mongoose.Types.ObjectId.isValid(tags));
if (!validTags){
    return res.status(400).send({message: "Invalid Tag ID"});
    }

    const post = new Post({
        title:title,
        content:content,
        thumbnail:thumbnail,
        tags:tags,
        user:userID
        });
        await post.save();
        res.status(201).send({post});

    });

const getPost = asynchandler(async(req,res)=>{
    const postID = req.params.id;
    const post = await Post.findById(postID).populate({
        path: 'comments',
        populate: {
            path: 'user', // Populate the user field within each comment
            select: 'username' // Select the fields you want to include from the user
        }
    }).populate('tags')
        .exec();
    if (!post){
        res.status(404).send({message: "Post not found"});
        return;
        }
     
        res.status(200).send({post});
        });

const getPosts = asynchandler(async(req,res)=>{

    const posts = await Post.find().populate('tags').exec();
res.status(200).send({posts});

});
const partialUpdatePost = asynchandler(async(req,res) =>{
    const postID = req.params.id;
    const {title,content,tags,thumbnail} = req.body;

    let updatedPostData = {};
    if (title) updatedPostData.title = title;
    if (content) updatedPostData.content = content;
    if (thumbnail) updatedPostData.thumbnail = thumbnail;
    if (tags && tags.length >= 1) updatedPostData.tags = tags;

    if(tags){
const validTags = tags.every((tags) => mongoose.Types.ObjectId.isValid(tags));
if (!validTags){
 return res.status(400).send({message: "Invalid Tag ID"});
}
    }


    const post = await Post.findByIdAndUpdate(postID,
        updatedPostData,
        {new:true}).exec();
if (!post){
    return res.status(404).send({message: "Post not found"});
    }
    if (!post){
        res.status(404).send({message: "Post not found"});
        return;
        }
        
    res.status(200).send({post});
});
const deletePost = asynchandler(async(req,res)=>{
    const postID = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postID)
    .catch((err) =>{
        res.status(500).send({message: err.message});
    })
    
        res.status(200).send({message: "Post deleted"});
        });




    module.exports = {createPost,getPost,getPosts, partialUpdatePost, deletePost};


