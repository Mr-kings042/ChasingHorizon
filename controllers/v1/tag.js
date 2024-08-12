const asynchandler = require('express-async-handler');

const Tag = require ('../../models/Tag');

const createTag = asynchandler (async (req,res) =>{
const {name} = req.body;
 
if(!name){
 return res.status(400).json({message: 'Please enter a name for the tag'});
}
const lowerCaseName = name.toLowerCase();
//check if tag already exists
const foundTag = await Tag.findOne({name: lowerCaseName}).exec();
if (foundTag){
    return res.status(400).send({messsage: 'Tag Already Exists'});

}

const newTag = new Tag({name: lowerCaseName});
 await newTag.save();

return res.status(201).send({newTag});
});

const getTags = asynchandler (async (req,res) =>{
    const tags = await Tag.find().exec();
    res.status(201).send(tags);
});
const updateTag = asynchandler(async (req,res) =>{
    const tagID = req.params.id;
    const {name} = req.body;
    if (!name) {
        return res.status(400).send({message: "please provide all details"});

    }
    const updatedTag = await Tag.findByIdAndUpdate(tagID, {name: name.toLowerCase()},{new: true}).exec();
if (!updatedTag){
    return res.status(400).send({message: 'Tag not found'});

}
return res.status(200).send(updatedTag);
});

const deleteTag = asynchandler(async (req,res) =>{
    const tagID = req.params.id;

    
const deletedTag = await Tag.findByIdAndDelete(tagID)
.catch((error) =>{
    return res.status(500).send({message: error.message});
})
   
return res.status(200).send({message: 'Tag deleted successfully'});

});
module.exports = {createTag, getTags, updateTag, deleteTag};