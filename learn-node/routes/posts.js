const express = require("express");

const routes = express.Router();

const Posts = require("../model/Posts");

// get data
routes.get('/', async (req, res)=>{
    const getDoc = await Posts.find();
    try{
        res.json(getDoc);
    }
    catch(err){
        res.json({message: err})
    }
});

// post data
routes.post('/', async (req, res)=>{
    const post = new Posts({
        "title": req.body.title,
        "description": req.body.description
    });

    let doc = await post.save();
    try{
        return res.json({success: true, data: doc['_id'], message: "Posts Added"});
    }catch(err) {
        return res.json({success: false, data: "", message: err});
    }
});

// get induvidual data using by id
routes.get('/:postId', async (req, res)=>{
    console.log(req.params.postId);
    try{
        const getPostById = await Posts.findById(req.params.postId);
    res.json(getPostById)
    }
    catch(err){
        res.json({success: false, data: "", message: err});
    }
});

// delete data
routes.delete("/:postId", async (req, res)=>{
    console.log(req.params.postId)
    try{
        const delData = await Posts.remove({_id:req.params.postId});
        res.json(delData);
    }
    catch(err){
        res.json({message:err});
    }
});

// update data
routes.patch("/:postId", async (req, res)=>{
   try{
    const updateData = await Posts.updateOne(
        { _id: req.params.postId},
        { $set: {title: req.body.title} }
    )
    res.json(updateData);
   }catch(err){
    res.json({message:err});
   }
});

module.exports = routes;